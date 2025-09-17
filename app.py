from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import numpy as np
import traceback
from keras.models import load_model
import cv2
import nibabel as nib
from werkzeug.utils import secure_filename
from skimage.morphology import binary_opening, binary_closing, remove_small_objects, disk
from scipy.ndimage import binary_fill_holes

# --- CONFIGURATION ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model', 'liver_tumor_segmentation.h5')
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
STATIC_FOLDER = os.path.join(BASE_DIR, 'static')

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'nii', 'nii.gz'}

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 600 * 1024 * 1024

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(STATIC_FOLDER, exist_ok=True)

# Load model
try:
    model = load_model(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {str(e)}")

# --- HELPERS ---
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- PREPROCESSING ---

def preprocess_2d(img_path):
    image = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
    if image is None:
        raise ValueError("Image not loaded. Unsupported or corrupted file.")
    if image.shape[-1] == 4:
        image = cv2.cvtColor(image, cv2.COLOR_BGRA2BGR)
    image = cv2.resize(image, (256, 256))
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    norm = gray / 255.0
    return norm.reshape(1, 256, 256, 1), image

def preprocess_3d_middle_slice(volume):
    z = volume.shape[2] // 2
    slice_data = volume[:, :, z]
    clipped = np.clip(slice_data, -100, 400)
    min_val, max_val = np.min(clipped), np.max(clipped)
    normalized = (clipped - min_val) / (max_val - min_val + 1e-8)
    resized = cv2.resize(normalized, (256, 256))
    original = (resized * 255).astype(np.uint8)
    model_input = resized.reshape(1, 256, 256, 1)
    return model_input, original

# --- POSTPROCESSING ---

def postprocess_mask(pred_mask):
    mask = (pred_mask > 0.5).astype(np.uint8)[0, :, :, 0]
    mask = binary_closing(mask, disk(5))
    mask = binary_fill_holes(mask)
    mask = remove_small_objects(mask.astype(bool), min_size=50)
    mask = binary_opening(mask, disk(2))
    return mask.astype(np.uint8)

def classify_tumor(mask):
    tumor_pixels = np.sum(mask)
    has_tumor = tumor_pixels > 300
    confidence = float(tumor_pixels) / mask.size
    return bool(has_tumor), confidence

def save_visualization(original, mask, prefix):
    if len(original.shape) == 2:
        original = cv2.cvtColor(original, cv2.COLOR_GRAY2BGR)
    mask_img = (mask * 255).astype(np.uint8)
    overlay = original.copy()
    mask_colored = np.zeros_like(original)
    mask_colored[:, :, 2] = mask_img
    overlay = cv2.addWeighted(mask_colored, 0.5, overlay, 0.7, 0)
    original_path = os.path.join(STATIC_FOLDER, f"{prefix}_original.png")
    mask_path = os.path.join(STATIC_FOLDER, f"{prefix}_mask.png")
    overlay_path = os.path.join(STATIC_FOLDER, f"{prefix}_overlay.png")
    cv2.imwrite(original_path, original)
    cv2.imwrite(mask_path, mask_img)
    cv2.imwrite(overlay_path, overlay)
    return {
        "original": f"/static/{prefix}_original.png",
        "mask": f"/static/{prefix}_mask.png",
        "overlay": f"/static/{prefix}_overlay.png"
    }

# --- ROUTES ---

@app.route('/')
def index():
    return "✅ Liver Tumor Segmentation API is running!"

@app.route('/static/<filename>')
def serve_static(filename):
    return send_from_directory(STATIC_FOLDER, filename)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        if not allowed_file(file.filename):
            return jsonify({"error": "Unsupported file type"}), 400

        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        patient_name = request.form.get('name', '')
        age = request.form.get('age', '')
        phone = request.form.get('phone', '')

        if filename.lower().endswith(('.nii', '.nii.gz')):
            return handle_3d(filepath, patient_name, age, phone)
        else:
            return handle_2d(filepath, patient_name, age, phone)

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

def handle_2d(filepath, patient_name, age, phone):
    processed, original = preprocess_2d(filepath)
    pred_mask = model.predict(processed)
    cleaned_mask = postprocess_mask(pred_mask)
    has_tumor, confidence = classify_tumor(cleaned_mask)
    vis_paths = save_visualization(original, cleaned_mask, '2d_result')
    return jsonify({
        "original": vis_paths["original"],
        "predicted_mask": vis_paths["mask"],
        "overlay": vis_paths["overlay"],
        "file_type": "2D",
        "tumorInfo": {
            "has_tumor": has_tumor,
            "confidence": confidence,
            "tumor_slices": [0] if has_tumor else [],
            "total_slices": 1,
            "samples": [vis_paths]
        },
        "patientInfo": {
            "name": patient_name,
            "age": age,
            "phone": phone
        }
    })

def handle_3d(filepath, patient_name, age, phone):
    nii = nib.load(filepath)
    volume = nii.get_fdata()
    processed, original = preprocess_3d_middle_slice(volume)
    pred_mask = model.predict(processed)
    cleaned_mask = postprocess_mask(pred_mask)
    has_tumor, confidence = classify_tumor(cleaned_mask)
    vis_paths = save_visualization(original, cleaned_mask, '3d_middle_result')
    return jsonify({
        "original": vis_paths["original"],
        "predicted_mask": vis_paths["mask"],
        "overlay": vis_paths["overlay"],
        "file_type": "3D",
        "tumorInfo": {
            "has_tumor": has_tumor,
            "confidence": confidence,
            "tumor_slices": [0] if has_tumor else [],
            "total_slices": 1,
            "samples": [vis_paths]
        },
        "patientInfo": {
            "name": patient_name,
            "age": age,
            "phone": phone
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

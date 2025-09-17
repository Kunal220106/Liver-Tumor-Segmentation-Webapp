# Liver Tumor Segmentation WebApp with SPA-UNet


<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="40" alt="Python"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" width="40" alt="TensorFlow"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" width="40" alt="Flask"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" alt="React"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecolab/googlecolab-original.svg" width="40" alt="Google Colab"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" alt="CSS3"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" width="40" alt="NumPy"/>
</p>

---

## Project Overview

A professional, end-to-end web application for **automated liver tumor segmentation** in CT scans using **SPA-UNet** — an enhanced U-Net variant with **Spatial Pyramid Convolution Blocks (SPCB)** and **Residual Attention (RA)** blocks.

**Highlights**
- Automated segmentation and overlay visualization.  
- Robust against irregular tumor boundaries and low contrast.  
- **Performance (LiTS):** F1 = 0.9184, Precision = 0.9421, Accuracy = 97.74%.  
- **Deployment:** Flask backend + React frontend.  

---


## Preview / Screenshots

### Model Training Results
<p align="center">
  <img src="https://i.postimg.cc/RF1FkMHw/model-training-results.jpg" width="70%"/>
</p>
<p align="center">
  <img src="https://i.postimg.cc/DwWz2QGv/model-training-results-2.jpg" width="70%"/>
</p>

### WebApp Demo (Homepage → Input → Results)
<p align="center">
  <img src="https://i.postimg.cc/HxtYSBq2/homepage.jpg" width="30%"/>
  <img src="https://i.postimg.cc/VvGYw5L0/input-page.jpg" width="10%"/>
  <img src="https://i.postimg.cc/XNQNd1cN/result.jpg" width="30%"/>
</p>

---

## Datasets

- **LiTS (Liver Tumor Segmentation Challenge)**  
  201 CT volumes (131 training, 70 testing). Annotated masks for liver & tumor.  

---

## Tech Stack

- **Model Training**: Python, Google Colab  
- **Deep Learning**: TensorFlow, Keras  
- **Pre/Post Processing**: NumPy, NiBabel, Scikit-learn, Matplotlib, scikit-image  
- **Frontend**: React.js, CSS3  
- **Backend**: Flask  

---

## Project Structure
├── model/ # Trained models (.h5)
├── static/ # Frontend assets (CSS, JS)
├── templates/ # HTML templates (optional if React is separate)
├── uploads/ # Uploaded CT images
├── app.py # Flask backend
├── index.html # Upload page
├── results.html # Results page
├── frontend/ # React app
└── README.md


---

## Getting Started

### Prerequisites
- Python 3.8+  
- Node.js & npm  

### Backend (Flask)

# create env
python -m venv venv
source venv/bin/activate    # macOS/Linux
venv\Scripts\activate       # Windows

# install deps
pip install -r requirements.txt

# run backend
python app.py

### Frontend (React)
cd frontend
npm install
npm start

Default: Flask at http://localhost:5000, React at http://localhost:3000.

---

### Future Conrtibutions

 Real-time inference optimization

 Multi-organ segmentation extension

 Cloud deployment & PACS integration

 Secure user authentication
 ---
### Contributors

Kunal M G — Top Contributor

M Shashank

Preetham H S

Sinchana M

---
### Acknowledgements & References

Datasets: LiTS Challenge

Papers:

SPA-UNet (ScienceDirect): https://www.sciencedirect.com/science/article/pii/S1361841522003085

PubMed: https://pubmed.ncbi.nlm.nih.gov/37724113/

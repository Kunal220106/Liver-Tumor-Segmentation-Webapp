Liver Tumor Segmentation WebApp with SPA-UNet
<p align="center"> <a href="https://github.com/Kunal220106/Liver-Tumor-Segmentation-Webapp"> <img src="https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/brand-github.svg" width="32" /> <b>View Code</b> </a> </p>
Project Overview
A professional web application for automating liver tumor segmentation in CT scans using SPA-UNet—an advanced variant of U-Net with improved accuracy for clinical images.

Key Features
Handles irregular tumor boundaries and low-contrast CT scans

Real-time results and segmentation visualization

High accuracy: F1 Score 0.9184, Precision 0.9421, Accuracy 97.74% (LiTS dataset)

Automates core radiology workflow

Model Training Results
<p align="center"> <img src="https://i.postimg.cc/RF1FkMHw/model-training-results.jpg" width="48%"/> <img src="https://i.postimg.cc/DwWz2QGv/model-training-results-2.jpg" width="48%"/> </p>
WebApp Demo
<p align="center"> <img src="https://i.postimg.cc/HxtYSBq2/homepage.jpg" alt="Homepage" width="32%"/> <img src="https://i.postimg.cc/VvGYw5L0/input-page.jpg" alt="Input Page" width="32%"/> <img src="https://i.postimg.cc/XNQNd1cN/result.jpg" alt="Results Page" width="32%"/> </p>
Homepage Preview  | 
Input Page Preview  | 
Results Page Preview
Datasets
LiTS Challenge:
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original-wordmark.svg" width="20"/> 201 CT volumes (131 train, 70 test)
Kaggle Dataset

Tech Stack
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="32" /> Python (Model training)
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" width="32" /> TensorFlow, Keras
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="32" /> React.js (Frontend)
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" width="32" /> Flask (Backend)
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecolab/googlecolab-original.svg" width="32" /> Google Colab (Cloud training)
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="32" /> CSS3 (Design)
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" width="32" /> Numpy, NiBabel, scikit-learn

Project Structure
text
├── model/                # Trained model files (.h5)
├── static/               # Frontend assets (CSS, JS)
├── templates/            # HTML templates
├── uploads/              # Uploaded CT images
├── app.py                # Flask backend
├── index.html            # Upload page
├── results.html          # Results display page
Roadmap
Optimize for real-time clinical inference

Generalize to multi-organ segmentation

Explore PACS/cloud deployment integration

Acknowledgements
LiTS Challenge Dataset

SPA-UNet Paper

Icons from Devicon, Tabler Icons

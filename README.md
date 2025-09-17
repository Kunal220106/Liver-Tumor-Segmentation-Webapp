# Liver Tumor Segmentation WebApp with SPA-UNet

<p align="center">
  <a href="https://github.com/Kunal220106/Liver-Tumor-Segmentation-Webapp" title="View Code">
    <img src="https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/brand-github.svg" width="28" alt="GitHub" />
    &nbsp;<strong>View Code</strong>
  </a>
</p>

---

## Badges

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="40" alt="Python"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" width="40" alt="TensorFlow"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" width="40" alt="Flask"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" alt="React"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecolab/googlecolab-original.svg" width="40" alt="Google Colab"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" alt="CSS3"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" width="40" alt="NumPy"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original-wordmark.svg" width="60" alt="Kaggle"/>
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

**Model Training Results**
<p align="center">
  <img src="https://i.postimg.cc/RF1FkMHw/model-training-results.jpg" width="48%"/>
  <img src="https://i.postimg.cc/DwWz2QGv/model-training-results-2.jpg" width="48%"/>
</p>

**WebApp Demo (Homepage → Input → Results)**
<p align="center">
  <img src="https://i.postimg.cc/HxtYSBq2/homepage.jpg" width="32%"/>
  <img src="https://i.postimg.cc/VvGYw5L0/input-page.jpg" width="32%"/>
  <img src="https://i.postimg.cc/XNQNd1cN/result.jpg" width="32%"/>
</p>

---

## Datasets

- **LiTS (Liver Tumor Segmentation Challenge)**  
  201 CT volumes (131 training, 70 testing). Annotated masks for liver & tumor.  
  📂 [Kaggle Dataset](https://www.kaggle.com/datasets/harshwardhanbhangale/lits-dataset)

- **3DIRCADb**  
  22 CT volumes with expert tumor annotations. Used for validation.  

---

## Tech Stack

- **Model Training**: Python, Google Colab  
- **Deep Learning**: TensorFlow, Keras  
- **Pre/Post Processing**: NumPy, NiBabel, Scikit-learn, Matplotlib, scikit-image  
- **Frontend**: React.js, CSS3  
- **Backend**: Flask  

---

## Project Structure


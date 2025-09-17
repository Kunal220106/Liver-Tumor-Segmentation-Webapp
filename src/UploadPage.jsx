import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadPage.css";

const UploadPage = () => {
    const [patientName, setPatientName] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file chosen");
    const [uploaded, setUploaded] = useState(false);
    const [resultData, setResultData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("success");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // Voice prompt on page load
    useEffect(() => {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            synth.cancel(); // Stop any previous speech
            const utter = new window.SpeechSynthesisUtterance("Please enter your details.");
            utter.rate = 1;
            synth.speak(utter);
        }
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !patientName || !age || !phone) {
            setModalMessage("Please fill all fields and upload a CT scan image.");
            setModalType("error");
            setShowModal(true);
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", patientName);
        formData.append("age", age);
        formData.append("phone", phone);

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload image.");
            }

            const data = await response.json();
            
            if (data.original && data.predicted_mask && data.overlay) {
                setUploaded(true);
                setResultData({
                    inputImage: `http://127.0.0.1:5000${data.original}`,
                    segmentationMask: `http://127.0.0.1:5000${data.predicted_mask}`,
                    overlayImage: `http://127.0.0.1:5000${data.overlay}`,
                    patientInfo: { name: patientName, age, phone },
                    tumorInfo: data.tumorInfo,
                    fileType: data.file_type
                });
                setModalMessage("Image processed successfully!");
                setModalType("success");
                setShowModal(true);
            } else {
                throw new Error("Incomplete response from backend.");
            }
        } catch (error) {
            console.error("Error:", error);
            setModalMessage("Error processing image. Please try again.");
            setModalType("error");
            setShowModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartProcess = () => {
        if (resultData) {
            navigate("/results", { state: resultData });
        } else {
            setModalMessage("No results to show. Please upload a scan first.");
            setModalType("error");
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="upload-page">
            <div className="background"></div>
            <div className="form-container">
                <h1 className="title">Lets get started with your details and scan</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <div className="input-group">
                            <label htmlFor="patient-name">Patient Name</label>
                            <input
                                id="patient-name"
                                type="text"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                className="input"
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="patient-age">Age</label>
                            <input
                                id="patient-age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="input"
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="patient-phone">Phone Number</label>
                            <input
                                id="patient-phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="input"
                                pattern="[0-9]{10}"
                                required
                            />
                        </div>
                        
                        <div className="file-upload-container">
                            <p className="upload-label">Upload CT Scan (NIfTI or PNG/JPG)</p>
                            <div className="custom-file-input">
                                <input
                                    id="ct-upload"
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.nii,.nii.gz"
                                    onChange={handleFileChange}
                                    className="file-input"
                                    required
                                />
                                <label htmlFor="ct-upload" className="file-button">Choose File</label>
                                <span className="file-name">{fileName}</span>
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className={`button upload-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="spinner"></span>
                            ) : (
                                <>Analyze Scan <span className="button-span">→</span></>
                            )}
                        </button>
                    </div>
                </form>

                {uploaded && (
                    <div className="button-container">
                        <button
                            className="button results-button"
                            onClick={handleStartProcess}
                        >
                            View Results <span className="button-span">→</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Custom Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className={`modal-icon ${modalType}`}>
                            {modalType === "success" ? "✓" : "!"}
                        </div>
                        <h3 className="modal-title">
                            {modalType === "success" ? "Success" : "Attention Needed"}
                        </h3>
                        <p className="modal-message">{modalMessage}</p>
                        <button className="modal-button" onClick={closeModal}>
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadPage;

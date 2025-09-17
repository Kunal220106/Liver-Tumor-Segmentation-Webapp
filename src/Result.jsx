import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { inputImage, segmentationMask, overlayImage, patientInfo, fileType, tumorInfo } = location.state || {};

    // Text-to-speech function
    const speakResult = (hasTumor) => {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            synth.cancel(); // Stop any current speech
            
            const intro = "Here are the results of your CT scan. ";
            const diagnosis = hasTumor 
                ? "Tumor tissue detected. Please consult your doctor immediately." 
                : "No tumor tissue detected. Routine follow-up is advised.";
            
            const utterance = new SpeechSynthesisUtterance(intro + diagnosis);
            
            // Configure voice settings
            utterance.rate = 0.9; // Slightly slower speed
            utterance.pitch = 1; // Normal pitch
            
            // Optional: Try to find a natural-sounding voice
            const voices = synth.getVoices();
            const femaleVoice = voices.find(v => v.lang === 'en-US' && v.name.includes("Female"));
            if (femaleVoice) utterance.voice = femaleVoice;
            
            synth.speak(utterance);
        }
    };

    // Speak results when component loads
    useEffect(() => {
        if (tumorInfo?.has_tumor !== undefined) {
            speakResult(tumorInfo.has_tumor);
        }
    }, [tumorInfo]);

    return (
        <div className="result-page">
            <div className="background"></div>
            <div className="content-container">
                <header className="header">
                    <h1 className="title">Diagnostic Report</h1>
                    {patientInfo && (
                        <div className="patient-info">
                            <h2>{patientInfo.name}</h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="label">Age:</span>
                                    <span className="value">{patientInfo.age}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Contact:</span>
                                    <span className="value">{patientInfo.phone}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                <div className="results-container">
                    <div className="image-grid">
                        <div className="result-card">
                            <h3 className="card-title">Original Scan</h3>
                            <img src={inputImage} alt="Input CT" className="result-image" />
                        </div>
                        <div className="result-card">
                            <h3 className="card-title">Segmentation Mask</h3>
                            <img src={segmentationMask} alt="Segmentation Mask" className="result-image" />
                        </div>
                        <div className="result-card">
                            <h3 className="card-title">Overlay Visualization</h3>
                            <img src={overlayImage} alt="Overlay" className="result-image" />
                        </div>
                    </div>

                    <div className="diagnostic-summary">
                        <h3>Analysis Results</h3>
                        <p className={tumorInfo?.has_tumor ? "positive" : "negative"}>
                            {tumorInfo?.has_tumor 
                                ? "🚨 Tumor tissue detected - Clinical inspection recommended"
                                : "✅ No tumor tissue detected - Routine follow-up advised"}
                        </p>
                        <button 
                            className="voice-button"
                            onClick={() => speakResult(tumorInfo?.has_tumor)}
                        >
                            🔊 Hear Results Again
                        </button>
                    </div>

                    <div className="action-buttons">
                        <button 
                            className="next-btn" 
                            onClick={() => navigate('/final-advice', { state: location.state })}
                        >
                            Next Steps
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;

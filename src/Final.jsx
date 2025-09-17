import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Final.css";

const Final = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { inputImage, segmentationMask, overlayImage } = location.state || {};

    const handleDownload = () => {
        [inputImage, segmentationMask, overlayImage].forEach((url, index) => {
            if (!url) return;
            const link = document.createElement('a');
            link.href = url;
            link.download = `diagnosis_${['original','mask','overlay'][index]}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    return (
        <div className="container">
            <div className="final-content">
                <h2 className="final-title">Liver Tumor: Care & Guidance</h2>
                
                <div className="final-section">
                    <h3>Common Symptoms</h3>
                    <ul>
                        <li>Persistent abdominal pain (upper right side)</li>
                        <li>Unexplained weight loss</li>
                        <li>Loss of appetite</li>
                        <li>Jaundice (yellowing of skin/eyes)</li>
                        <li>Abdominal swelling</li>
                        <li>Fatigue or weakness</li>
                        <li>Nausea or vomiting</li>
                    </ul>
                </div>

                <div className="final-section">
                    <h3>Remedies & Next Steps</h3>
                    <ul>
                        <li>Consult a hepatologist or oncologist</li>
                        <li>Schedule follow-up imaging (CT/MRI)</li>
                        <li>Complete liver function tests</li>
                        <li>Consider biopsy if recommended</li>
                        <li>Discuss all treatment options with your doctor</li>
                    </ul>
                </div>

                <div className="final-section">
                    <h3>Healthy Lifestyle Tips</h3>
                    <ul>
                        <li>Avoid alcohol and smoking</li>
                        <li>Eat a balanced, liver-friendly diet</li>
                        <li>Exercise regularly</li>
                        <li>Stay hydrated</li>
                        <li>Monitor liver health as advised</li>
                    </ul>
                </div>

                <div className="final-encouragement">
                    <p>
                        <b>Get well soon!</b> Early detection and proper care can make a huge difference. Stay positive and follow your medical team's advice. Wishing you a speedy recovery! 💜
                    </p>
                </div>

                <div className="final-actions">
                    <button className="final-download-btn" onClick={handleDownload}>
                        Download All Scans
                    </button>
                    <button className="final-home-btn" onClick={() => navigate("/")}>
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Final; // Fix: export Final, not FinalPage

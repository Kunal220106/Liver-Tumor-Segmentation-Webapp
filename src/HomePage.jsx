import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="background"></div>

            <header className="title-container">
                <h1 className="title">LIVER TUMOR SEGMENTATION APP</h1>
            </header>

            <div className="content-wrapper">
                <aside className="left-section">
                    <h3 className="point">Fast & Accurate Segmentation</h3>
                    <h3 className="point">Easy-to-Use Interface</h3>
                    <h3 className="point">AI-Powered Insights</h3>
                </aside>

                <div className="divider"></div>

                <div className="center-box">
                    <Link to="/upload">
                        <button className="button">
                            Get Started! <span className="button-span">&#8594;</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

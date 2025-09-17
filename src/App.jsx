import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import UploadPage from "./UploadPage";
import Result from "./Result";
import Final from "./Final"; // Fix: import from './Final'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/results" element={<Result />} />
                <Route path="/final-advice" element={<Final />} /> {/* Fix: use <Final /> */}
            </Routes>
        </Router>
    );
};

export default App;

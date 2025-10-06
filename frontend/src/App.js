import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import FeedbackForm from "./components/FeedbackForm";
import Report from "./components/Report";
import Registration from "./components/Registration";



function App() {
  return (
    <Layout>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Feedback Form (Dynamic Route) */}
        <Route path="/FeedbackForm/:campType" element={<FeedbackForm />} />

        {/* Report Page */}
        <Route path="/report" element={<Report />} />

        {/* Student Registration Form */}
        <Route path="/registration" element={<Registration />} />






      </Routes>
    </Layout>
  );
}

export default App;

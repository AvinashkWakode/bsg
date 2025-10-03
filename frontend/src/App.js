import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/FeedbackForm/:campType" element={<FeedbackForm />} />
        {/* Dynamic route for each camp */}
      </Routes>
    </Layout>
  );
}

export default App;

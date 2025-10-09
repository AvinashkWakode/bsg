import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // ✅ For SEO meta tags
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  return (
    <>
      {/* ✅ Global SEO defaults for entire app */}
      <Helmet>
        <title>BSG India Feedback | Official Portal</title>
        <meta
          name="description"
          content="Welcome to BSG India Feedback Portal. Share your feedback, explore camp reports, and register easily on the official BSG platform."
        />
        <meta
          name="keywords"
          content="BSG feedback, BSG India, feedback form, BSG camp, Bharat Scouts and Guides feedback, BSG NHQ, BSG, Feedback for BSG India, Feedback survey, BSG Feedback portal,Scouts and Guides, "
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bsgindiaa.netlify.app/" />
      </Helmet>

      <Layout>
        <Routes>
          {/* 🏠 Home Page */}
          <Route path="/" element={<LandingPage />} />

          {/* 📝 Feedback Form Page */}
          <Route path="/FeedbackForm/:campType" element={<FeedbackForm />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

import React, { useState } from "react";
import { Helmet } from "react-helmet-async"; // for SEO meta tags

const FeedbackForm = () => {
  const initialRatings = Array(10).fill(""); // for 10 questions

  const [formData, setFormData] = useState({
    name: "",
    uid: "",
    mobile: "",
    place: "",
    instructor: "",
    date: "",
    ratings: initialRatings,
    comments: "",
  });

  const [showThankYou, setShowThankYou] = useState(false);

  const questions = [
    "Safety measures during activities",
    "Enjoyment of activities (trekking, water sports, etc.)",
    "Helpfulness of instructors",
    "Equipment quality and maintenance",
    "Schedule organization",
    "Challenge level of activities",
    "Pre-activity preparation and guidance",
    "Food and accommodation quality",
    "Emergency / first-aid support",
    "Overall satisfaction with the camp",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const regex = /^[A-Za-z\s]{0,25}$/;
      if (!regex.test(value)) return;
    }
    if (name === "uid") {
      const regex = /^[A-Za-z]{0,3}\d{0,9}$/;
      if (!regex.test(value)) return;
    }
    if (name === "mobile") {
      const regex = /^\d{0,10}$/;
      if (!regex.test(value)) return;
    }
    if ((name === "place" || name === "instructor") && value.length > 30) return;
    if (name === "comments") {
      const words = value.trim().split(/\s+/);
      if (words.length > 70) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (index, value) => {
    const newRatings = [...formData.ratings];
    newRatings[index] = value;
    setFormData({ ...formData, ratings: newRatings });
  };

  const isFormComplete = () => {
    const detailsFilled =
      formData.name &&
      formData.mobile &&
      formData.place &&
      formData.uid &&
      formData.instructor &&
      formData.date;
    const allRatingsFilled = formData.ratings.every((r) => r !== "");
    const commentsFilled = formData.comments.trim() !== "";
    return detailsFilled && allRatingsFilled && commentsFilled;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uidRegex = /^[A-Za-z]{3}\d{9}$/;
    if (!uidRegex.test(formData.uid)) {
      alert("BSG UID must be 3 letters followed by 9 digits!");
      return;
    }
    if (formData.mobile.length !== 10) {
      alert("Mobile Number must be exactly 10 digits!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL.replace(/\/$/, "")}/api/feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setShowThankYou(true);
        setFormData({
          name: "",
          uid: "",
          mobile: "",
          place: "",
          instructor: "",
          date: "",
          ratings: Array(10).fill(""),
          comments: "",
        });
        setTimeout(() => setShowThankYou(false), 3000);
      } else {
        const errMsg = await response.json();
        alert("Error submitting feedback: " + errMsg.error);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Server not reachable. Please try again later.");
    }
  };

  const commentWordCount =
    formData.comments.trim() === ""
      ? 0
      : formData.comments.trim().split(/\s+/).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        position: "relative",
      }}
    >
      {/* SEO Meta Tags */}
      <Helmet>
        <title>BSG Adventure Camp Feedback Form</title>
        <meta
          name="description"
          content="Provide your feedback for BSG Adventure Camp. Rate safety, instructors, activities, and overall satisfaction. Help us improve future camps."
        />
        <meta
          name="keywords"
          content="BSG feedback, adventure camp feedback, scout guide feedback, camp rating, BSG survey, BSG"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="BSG Adventure Camp Feedback Form" />
        <meta
          property="og:description"
          content="Provide your feedback for BSG Adventure Camp. Rate safety, instructors, activities, and overall satisfaction."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bsgindiaa.netlify.app/feedbackform" />
        <meta property="og:image" content="https://bsgindiaa.netlify.app/preview-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BSG Adventure Camp Feedback Form" />
        <meta
          name="twitter:description"
          content="Provide your feedback for BSG Adventure Camp. Rate safety, instructors, activities, and overall satisfaction."
        />
        <meta name="twitter:image" content="https://bsgindiaa.netlify.app/bsg_logo.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://bsgindiaa.netlify.app/feedbackform" />
      </Helmet>

      <section className="form-container">
        <header>
          <h1 className="form-title">
            BSG Adventure Camp – Participant Feedback Form
          </h1>
        </header>

        <form onSubmit={handleSubmit}>
          <article className="form-grid" aria-label="Participant Details">
            <div>
              <label className="bold-label" htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Max 25 letters"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="bold-label" htmlFor="mobile">Mobile Number:</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
                placeholder="10 digits"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="bold-label" htmlFor="place">Place of Camp:</label>
              <input
                type="text"
                id="place"
                name="place"
                value={formData.place}
                onChange={handleInputChange}
                required
                placeholder="Enter camp location"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="bold-label" htmlFor="uid">BSG UID:</label>
              <input
                type="text"
                id="uid"
                name="uid"
                value={formData.uid}
                onChange={handleInputChange}
                required
                placeholder="3 letters + 9 digits"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="bold-label" htmlFor="instructor">Instructor Name:</label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
                required
                placeholder="Enter instructor's name"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="bold-label" htmlFor="date">Date of Camp:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </div>
          </article>

          <section className="note">
            <ul>
              <li>
                Rate each aspect of the camp from 1 to 5,{" "}
                <strong>(1 = Poor, 5 = Excellent)</strong>.
              </li>
              <li>All feedback questions are mandatory.</li>
              <li>Your honest feedback helps us improve future camps.</li>
            </ul>
          </section>

          <p className="bold-label">Rating Key:</p>
          <ul style={{ marginBottom: "1.5rem" }}>
            <li>1 – Poor ★☆☆☆☆</li>
            <li>2 – Fair ★★☆☆☆</li>
            <li>3 – Good ★★★☆☆</li>
            <li>4 – Very Good ★★★★☆</li>
            <li>5 – Excellent ★★★★★</li>
          </ul>

          <section aria-label="Camp Feedback Questions">
            {questions.map((q, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <label className="bold-label">
                  {index + 1}. {q}
                </label>
                <div role="radiogroup" aria-labelledby={`question-${index}`}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <label
                      key={num}
                      style={{ marginRight: "1rem", fontWeight: "400" }}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={num}
                        checked={formData.ratings[index] === num.toString()}
                        onChange={() =>
                          handleRatingChange(index, num.toString())
                        }
                        required
                        style={{ marginRight: "0.25rem" }}
                      />
                      {num}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <div style={{ marginBottom: "0.5rem" }}>
            <label className="bold-label" htmlFor="comments">
              Any Suggestions (Max 70 words):
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              rows={4}
              placeholder="Provide your suggestions"
              style={textareaStyle}
            />
            <p
              style={{
                fontSize: "0.9rem",
                textAlign: "right",
                marginTop: "0.25rem",
              }}
            >
              {commentWordCount}/70 words
            </p>
          </div>

          <button
            type="submit"
            style={{
              ...submitBtnStyle,
              backgroundColor: isFormComplete() ? "#1E40AF" : "#ccc",
              cursor: isFormComplete() ? "pointer" : "not-allowed",
            }}
            disabled={!isFormComplete()}
          >
            Submit
          </button>
        </form>
      </section>

      {showThankYou && (
        <div style={thankYouStyle}>
          <p>Thank You for your feedback!</p>
        </div>
      )}

      <style>{`
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 2rem;
          row-gap: 1.5rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
            column-gap: 0;
          }
        }
        .form-container {
          background-color: #ffffff;
          border-radius: 15px;
          padding: 2rem;
          max-width: 900px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .form-title {
          text-align: center;
          margin-bottom: 2rem;
          color: #1E40AF;
        }
        .bold-label {
          font-weight: 600;
          display: block;
          margin-bottom: 0.25rem;
        }
        .note ul {
          margin-bottom: 1rem;
          padding-left: 1.2rem;
        }
        .note li {
          margin-bottom: 0.3rem;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

// Styles
const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "1rem",
};

const textareaStyle = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "1rem",
  resize: "vertical",
};

const submitBtnStyle = {
  padding: "0.75rem 1.5rem",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "1rem",
  display: "block",
  margin: "0 auto",
  transition: "all 0.3s ease",
};

const thankYouStyle = {
  position: "fixed",
  top: "20%",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#1E40AF",
  color: "#fff",
  padding: "1.5rem 2rem",
  borderRadius: "10px",
  fontSize: "1.2rem",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  zIndex: 9999,
};

export default FeedbackForm;

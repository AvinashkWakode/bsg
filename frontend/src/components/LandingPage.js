import React from "react";
import { Helmet } from "react-helmet-async"; // SEO meta tags

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>BSG India – Feedback Portal</title>
        <meta
          name="description"
          content="Welcome to BSG Project. Explore events, participate, and share your feedback to help us improve."
        />
        <meta
          name="keywords"
          content="BSG , BSG events, BSG feedback, adventure camp feedback, Scout Guide feedback, Feedback Form"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags for social media previews */}
        <meta property="og:title" content="BSG Project – Events & Feedback Portal" />
        <meta
          property="og:description"
          content="Welcome to BSG Project. Explore events, participate, and share your feedback to help us improve."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bsgindiaa.netlify.app/" />
        <meta property="og:image" content="https://bsgindiaa.netlify.app/preview-image.png" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BSG Project – Events & Feedback Portal" />
        <meta
          name="twitter:description"
          content="Welcome to BSG Project. Explore events, participate, and share your feedback to help us improve."
        />
        <meta name="twitter:image" content="https://bsgindiaa.netlify.app/preview-image.png" />

        {/* Canonical URL to prevent duplicate content */}
        <link rel="canonical" href="https://bsgindiaa.netlify.app/" />
      </Helmet>

      <main>
        <header style={{ textAlign: "center", padding: "5rem" }}>
          <h1>Welcome to BSG Project</h1>
          <p>Explore events and share your feedback!</p>
        </header>
      </main>
    </>
  );
};

export default LandingPage;

import React from "react";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet-async"; // SEO meta tags

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>BSG Project – Adventure Camps & Feedback</title>
        <meta
          name="description"
          content="BSG Project: Explore adventure camps, provide feedback, and improve your experience with our events."
        />
        <meta
          name="keywords"
          content="BSG Project, BSG events, BSG feedback, adventure camp feedback, user feedback"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags for social media previews */}
        <meta property="og:title" content="BSG Project – Adventure Camps & Feedback" />
        <meta
          property="og:description"
          content="BSG Project: Explore adventure camps, provide feedback, and improve your experience with our events."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bsgindiaa.netlify.app/" />
        <meta property="og:image" content="https://bsgindiaa.netlify.app/preview-image.png" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BSG Project – Adventure Camps & Feedback" />
        <meta
          name="twitter:description"
          content="BSG Project: Explore adventure camps, provide feedback, and improve your experience with our events."
        />
        <meta name="twitter:image" content="https://bsgindiaa.netlify.app/preview-image.png" />

        {/* Canonical URL to prevent duplicate content */}
        <link rel="canonical" href="https://bsgindiaa.netlify.app/" />
      </Helmet>

      <div style={{ backgroundColor: "#e0f2fe", minHeight: "100vh" }}>
        <Navbar />

        <main style={{ padding: "2rem" }}>
          {children} {/* dynamic content goes here */}
        </main>

        <footer
          style={{
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "#1E40AF",
            color: "white",
            marginTop: "2rem",
          }}
        >
          © 2025 BSG Project. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Layout;

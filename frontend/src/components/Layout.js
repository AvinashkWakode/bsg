import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div style={{ backgroundColor: "#e0f2fe", minHeight: "100vh" }}>
      <Navbar />

      <main style={{ padding: "2rem" }}>
        {children}  {/* dynamic content goes here */}
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
  );
};

export default Layout;

import React, { useState } from "react";

const Layout = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownItems = [
    "Adventure Programme Camp",
    "Testing / Award Camps",
    "Training / Leader / Staff Camps",
    "National / State Integration / Rally Camps",
    "Educational, Recreational, Social Service Camps",
    "Jamboree",
    "Specialised Courses / Modules",
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="layout">
      {/* Navbar */}
      <nav className="navbar">
        {/* Left: Logo */}
        <a href="/" className="logo">
          <img src="/bsg_logo.png" alt="BSG Logo" style={{ height: "40px", width: "250px" }} />
        </a>

        {/* Hamburger for Mobile */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Right: Nav Links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {/* Feedback Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className={`dropdown-title ${dropdownOpen ? "active" : ""}`}>
              Feedback ▼
            </span>
            <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
              {dropdownItems.map((item, index) => (
                <li key={index}>
                  <a href={`/FeedbackForm/${item.replace(/\s+/g, "-")}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* OYMS Registration */}
          <a href="/registration">OYMS Registration</a>

          {/* Dashboard */}
          <a href="/report">Dashboard</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">{children}</main>

      {/* Footer */}
      <footer className="footer">
        © 2025 BSG Project. All rights reserved.
      </footer>

      {/* Inline CSS */}
      <style>{`
        /* Layout */
        .layout {
          background-color: #e0f2fe;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Navbar */
        .navbar {
          position: sticky;
          top: 0;
          background-color: #1E40AF;
          color: white;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 1000;
        }

        .logo img {
          display: block;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: rgb(255, 215, 0);
        }

        /* Dropdown */
        .dropdown {
          position: relative;
        }

        .dropdown-title {
          font-weight: bold;
          cursor: pointer;
          transition: color 0.3s;
        }

        .dropdown-title.active {
          color: rgb(255, 215, 0);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background-color: #1E40AF;
          list-style: none;
          
          margin: 0;
          border-radius: 5px;
          min-width: 250px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
          z-index: 1000;
        }

        .dropdown-menu.open {
          max-height: 500px;
        }

        .dropdown-menu li a {
          display: block;
          padding: 0.5rem 1rem;
          color: white;
          text-decoration: none;
          border-radius: 3px;
        }

        .dropdown-menu li a:hover {
          color: rgb(255, 215, 0);
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .hamburger span {
          display: block;
          height: 3px;
          width: 100%;
          background: white;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        /* Footer */
        .footer {
          text-align: center;
          padding: 2rem;
          background-color: #1E40AF;
          color: white;
          margin-top: 2rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            flex-direction: column;
            background-color: #1E40AF;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            align-items: flex-start; /* Left-aligned links */
            padding-left: 1rem; /* optional spacing from left edge */
          }

          .nav-links.open {
            max-height: 600px;
          }

          .nav-links a {
            padding: 1rem 0;
            border-top: 1px solid rgba(255,255,255,0.2);
          }

          .dropdown-menu {
            position: static;
            max-height: 0;
          }

          .dropdown-menu.open {
            max-height: 500px;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;

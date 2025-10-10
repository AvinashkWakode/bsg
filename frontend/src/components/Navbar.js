import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // Use state to track window width for dynamic responsiveness
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dropdownRef = useRef(null);

    const dropdownItems = [
        "Adventure Programme Camp",
        "Testing / Award Camps",
        "Training / Leader / Staff Camps",
        "National / State Integration / Rally Camps",
        "Educational, Recreational, Social Service Camps",
        "Jamboree",
        "Specialised Courses / Modules",
    ];

    const isDesktop = windowWidth > 768;

    // Set up resize listener to update windowWidth state
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 768) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav
            role="navigation"
            // KEYWORD ENHANCEMENT: Added 'BSG feedback', 'BSG survey'
            aria-label="BSG Feedback and Camp Rating Survey Navigation Menu" 
            style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#1E40AF",
                color: "white",
                padding: "0.5rem 2rem",
                zIndex: 1000,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        >
            {/* Logo */}
            <NavLink to="/" aria-label="Go to BSG Official Home Page for Camp Ratings and Surveys">
                {/* KEYWORD ENHANCEMENT: Added 'BSG', 'customer feedback' */}
                <img src="/bsg_logo.png" alt="BSG Logo: Bharat Scouts and Guides Customer Feedback and Survey" style={{ height: "45px" }} />
            </NavLink>

            {/* Hamburger and Close Icon */}
            <div
                className="hamburger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                role="button"
                aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={mobileMenuOpen}
                style={{
                    display: isDesktop ? "none" : "flex",
                    position: "relative",
                    width: "25px",
                    height: "21px",
                    cursor: "pointer",
                    zIndex: 1001,
                }}
            >
                <span
                    style={{
                        position: "absolute",
                        left: 0,
                        width: "25px",
                        height: "3px",
                        backgroundColor: "white",
                        borderRadius: "2px",
                        transition: "all 0.3s ease-in-out",
                        top: mobileMenuOpen ? "9px" : "0px",
                        transform: mobileMenuOpen ? "rotate(45deg)" : "rotate(0)",
                    }}
                ></span>
                <span
                    style={{
                        position: "absolute",
                        left: 0,
                        top: "9px",
                        width: "25px",
                        height: "3px",
                        backgroundColor: "white",
                        borderRadius: "2px",
                        transition: "opacity 0.2s ease-in-out",
                        opacity: mobileMenuOpen ? "0" : "1",
                    }}
                ></span>
                <span
                    style={{
                        position: "absolute",
                        left: 0,
                        width: "25px",
                        height: "3px",
                        backgroundColor: "white",
                        borderRadius: "2px",
                        transition: "all 0.3s ease-in-out",
                        top: mobileMenuOpen ? "9px" : "18px",
                        transform: mobileMenuOpen ? "rotate(-45deg)" : "rotate(0)",
                    }}
                ></span>
            </div>


            {/* Navigation Links */}
            <div
                className={`nav-links ${mobileMenuOpen ? "open" : ""}`}
                role="menubar"
                aria-hidden={!isDesktop && !mobileMenuOpen}
                style={{
                    display: isDesktop || mobileMenuOpen ? "flex" : "none",
                    alignItems: isDesktop ? "center" : "flex-start",
                    flexDirection: isDesktop ? "row" : "column",
                    gap: isDesktop ? "1.5rem" : "0.5rem",
                    width: isDesktop ? "auto" : "100%",
                }}
            >
                <NavLink
                    to="/"
                    end
                    role="menuitem"
                    aria-current={({ isActive }) => (isActive ? "page" : undefined)}
                    style={({ isActive }) => ({
                        color: isActive ? "rgb(255, 215, 0)" : "white",
                        textDecoration: "none",
                        fontWeight: isActive ? "bold" : "normal",
                        width: isDesktop ? "auto" : "100%",
                        padding: isDesktop ? "0" : "0.5rem 1rem",
                    })}
                    onClick={() => !isDesktop && setMobileMenuOpen(false)}
                >
                    Home
                </NavLink>

                {/* Dropdown */}
                <div
                    ref={dropdownRef}
                    role="group"
                    style={{ 
                        position: isDesktop ? "relative" : "static",
                        width: isDesktop ? "auto" : "100%",
                    }}
                    onMouseEnter={() => isDesktop && setDropdownOpen(true)}
                    onMouseLeave={() => isDesktop && setDropdownOpen(false)}
                >
                    <span
                        onClick={() => !isDesktop && setDropdownOpen(!dropdownOpen)}
                        role="button"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                        aria-controls="feedback-submenu"
                        // KEYWORD ENHANCEMENT: Added 'BSG feedback', 'camp rating'
                        aria-label="BSG Feedback, Camp Rating, and Survey Forms"
                        style={{
                            color: dropdownOpen ? "rgb(255, 215, 0)" : "white",
                            cursor: "pointer",
                            fontWeight: "bold",
                            padding: isDesktop ? "0.25rem 0.5rem" : "0.5rem 1rem",
                            display: "inline-block",
                            width: !isDesktop ? "100%" : "auto",
                            textAlign: "left",
                        }}
                    >
                        Feedback ▼
                    </span>

                    <ul
                        id="feedback-submenu"
                        role="menu"
                        aria-orientation="vertical"
                        aria-hidden={!dropdownOpen}
                        style={{
                            position: isDesktop ? "absolute" : "static",
                            top: isDesktop ? "100%" : "auto",
                            right: isDesktop ? 0 : "auto",
                            marginTop: isDesktop ? "11px" : "0",
                            backgroundColor: "#1E40AF",
                            listStyle: "none",
                            padding: "0.5rem 0",
                            margin: 0,
                            borderRadius: "1px",
                            minWidth: isDesktop ? "350px" : "100%",
                            boxShadow: isDesktop ? "0 6px 15px rgba(0,0,0,0.25)" : "none",
                            maxHeight: dropdownOpen ? "1000px" : "0",
                            overflow: "hidden",
                            opacity: dropdownOpen ? 1 : 0,
                            transition: "all 0.4s ease",
                            zIndex: 1000,
                        }}
                    >
                        {dropdownItems.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    to={`/FeedbackForm/${item.replace(/\s+/g, "-")}`}
                                    role="menuitem"
                                    style={({ isActive }) => ({
                                        display: "block",
                                        padding: "0.5rem 1rem",
                                        color: isActive ? "rgb(255, 215, 0)" : "white",
                                        textDecoration: "none",
                                        backgroundColor: isActive ? "#1A3CC8" : "transparent",
                                        borderRadius: "3px",
                                        width: "100%",
                                    })}
                                    onClick={() => {
                                        if (!isDesktop) {
                                            setDropdownOpen(false);
                                            setMobileMenuOpen(false);
                                        }
                                    }}
                                >
                                    {/* Link text: contains 'Adventure Camp' and other camp types, which are already strong keywords. */}
                                    {item}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile styles */}
            <style>{`
        @media (max-width: 768px) {
          .hamburger {
            display: flex !important;
          }
          .nav-links {
            margin-top: ${mobileMenuOpen ? "0.5rem" : "0"}; 
            transition: margin-top 0.4s ease;
          }
          .nav-links ul {
            max-height: ${dropdownOpen ? "1000px" : "0"};
            opacity: ${dropdownOpen ? "1" : "0"};
            position: static !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            width: 100%;
          }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;

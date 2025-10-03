import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const dropdownItems = [
    "Adventure Programme Camp",
    "Testing / Award Camps",
    "Training / Leader / Staff Camps",
    "National / State Integration / Rally Camps",
    "Educational, Recreational, Social Service Camps",
    "Jamboree",
    "Specialised Courses / Modules",
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#1E40AF",
        color: "white",
        padding: "1rem 2rem",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
      }}
    >
      <NavLink
        to="/"
        end
        style={({ isActive }) => ({
          marginRight: "2rem",
          color: isActive ? "rgb(255, 215, 0)" : "white",
          textDecoration: "none",
          fontWeight: isActive ? "bold" : "normal",
        })}
      >
        Events
      </NavLink>

      {/* Feedback Dropdown */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <NavLink
          to="#"
          style={{
            color: dropdownOpen ? "rgb(255, 215, 0)" : "white",
            textDecoration: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={toggleDropdown}
        >
          Feedback ▼
        </NavLink>

        {dropdownOpen && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              backgroundColor: "#1E40AF",
              listStyle: "none",
              padding: "0.5rem 0",
              margin: 0,
              borderRadius: "5px",
              minWidth: "250px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              zIndex: 1000,
            }}
          >
            {dropdownItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={`/FeedbackForm/${item.replace(/\s+/g, "-")}`}
                  style={({ isActive }) => ({
                    display: "block",
                    padding: "0.5rem 1rem",
                    color: isActive ? "rgb(255, 215, 0)" : "white",
                    textDecoration: "none",
                    backgroundColor: isActive ? "#1A3CC8" : "transparent",
                    borderRadius: "3px",
                    transition: "0.2s",
                  })}
                  onClick={() => setDropdownOpen(false)}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "rgb(255, 215, 0, 0.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = e.isActive
                      ? "#1A3CC8"
                      : "transparent")
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import "./Header.css";
// Import icons from FontAwesome and Material Design libraries
import { FaSearch, FaRegBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

function Header() {
  // State to manage the background color change on scroll
  const [show, handleShow] = useState(false);

  // Scroll listener to detect when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true); // Show black background after scrolling down 100px
      } else {
        handleShow(false); // Make background transparent when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup to prevent memory leaks
    };
  }, []);

  return (
    // Dynamically append "header__black" class based on show state
    <div className={`header ${show && "header__black"}`}>
      <div className="header__contents">
        {/* Main transparent Netflix logo read from public/ folder */}
        <img
          className="header__logo"
          src="/netflix-logo.png"
          alt="Netflix Logo"
        />

        {/* Right side navigation icons and profile container */}
        <div className="header__right">
          <FaSearch className="header__icon" />
          <p className="header__navLink">KIDS</p>
          <FaRegBell className="header__icon" />

          {/* User profile section with dropdown arrow */}
          <div className="header__profileContainer">
            <img
              className="header__avatar"
              src="/netflix-avatar.png"
              alt="Netflix Avatar"
            />
            <MdArrowDropDown className="header__dropdownIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

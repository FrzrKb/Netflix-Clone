import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { FaSearch, FaRegBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

function Header({ onLogout }) {
  const [show, handleShow] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [kidsMode, setKidsMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState("");
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);

  const searchRef = useRef(null);

  // 🔴 1. Ref to detect clicks/touches outside the profile dropdown menu
  const dropdownRef = useRef(null);

  // Scroll listener for black background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔴 2. Combined Effect to detect clicks/touches ANYWHERE to close Search and Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search if clicked outside
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }

      // Close profile dropdown if clicked outside anywhere on the screen
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Supports both desktop (mousedown) and mobile devices (touchstart)
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const showComingSoon = (featureName) => {
    setComingSoonMessage(`${featureName} feature is coming soon...`);
    setTimeout(() => {
      setComingSoonMessage("");
    }, 3000);
  };

  return (
    <>
      <div className={`header ${show && "header__black"}`}>
        <div className="header__contents">
          {/* Left Side */}
          <div className="header__left">
            <img
              className="header__logo"
              src="/netflix-logo.png"
              alt="Netflix Logo"
              onClick={() => {
                setKidsMode(false);
                showComingSoon("Main Dashboard Refresh");
              }}
            />
          </div>

          {/* Right Side */}
          <div className="header__right">
            {/* Search Container */}
            <div
              ref={searchRef}
              className={`header__searchContainer ${searchOpen && "header__searchContainer--active"}`}
            >
              <FaSearch
                className="header__icon"
                onClick={() => setSearchOpen(!searchOpen)}
              />
              {searchOpen && (
                <input
                  type="text"
                  className="header__searchInput"
                  /* 🔴 3. Placeholder changed to "Frezer" */
                  placeholder="Frezer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              )}
            </div>

            {/* KIDS Toggle */}
            <p
              className={`header__navLink ${kidsMode && "header__navLink--active"}`}
              onClick={() => {
                setKidsMode(!kidsMode);
                showComingSoon(
                  kidsMode ? "Adults Mode Switch" : "👦 Kids Mode Layout",
                );
              }}
            >
              {kidsMode ? "EXIT KIDS" : "KIDS"}
            </p>

            {/* Notification Bell */}
            <FaRegBell
              className="header__icon"
              onClick={() => showComingSoon("Notifications Center")}
            />

            {/* 🔴 4. User Profile Dropdown linked with dropdownRef */}
            <div ref={dropdownRef} className="header__profileWrapper">
              <div
                className="header__profileContainer"
                onClick={() => setDropdownOpen(!dropdownOpen)} // Toggles open/close
              >
                <img
                  className="header__avatar"
                  src="/netflix-avatar.png"
                  alt="Netflix Avatar"
                />
                <MdArrowDropDown
                  className={`header__dropdownIcon ${dropdownOpen && "header__dropdownIcon--rotate"}`}
                />
              </div>

              {/* 🔴 5. Dropdown Menu class dynamically changes for smooth transition */}
              <div
                className={`header__dropdownMenu ${dropdownOpen && "header__dropdownMenu--active"}`}
              >
                <div
                  className="header__dropdownItem"
                  onClick={() => showComingSoon("Manage Profiles")}
                >
                  Manage Profiles
                </div>
                <div
                  className="header__dropdownItem"
                  onClick={() => showComingSoon("Account Settings")}
                >
                  Account Settings
                </div>
                <hr className="header__dropdownDivider" />
                <div
                  className="header__dropdownItem header__logoutItem"
                  onClick={() => setShowLogoutWarning(true)}
                >
                  Sign out of Netflix
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Warning Modal */}
      {showLogoutWarning && (
        <div className="header__modalOverlay">
          <div className="header__logoutModal">
            <h2>Leaving...</h2>
            <p>Are you sure you want to sign out ?</p>
            <div className="header__modalButtons">
              <button className="header__modalBtnConfirm" onClick={onLogout}>
                Yes
              </button>
              <button
                className="header__modalBtnCancel"
                onClick={() => setShowLogoutWarning(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Toast */}
      {comingSoonMessage && (
        <div className="header__toastNotification">
          <p>{comingSoonMessage}</p>
        </div>
      )}
    </>
  );
}

export default Header;

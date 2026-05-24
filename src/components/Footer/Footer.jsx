import React from "react";
import "./Footer.css";
// Import the Globe icon from react-icons
import { FiGlobe } from "react-icons/fi";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        {/*  Customer Service contact line */}
        <p className="footer__title">Questions? Call 0914449960</p>

        {/* Main container to align the links into 4 columns */}
        <div className="footer__rows">
          {/* 🔹 Column 1 */}
          <div className="footer__column">
            <a href="https://help.netflix.com/en/node/412">FAQ</a>
            <a href="netflix.com/et/login?nextpage=https%3A%2F%2Fwww.netflix.com%2Fyouraccount">
              Investor Relations
            </a>
            <a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a>
            <a href="https://help.netflix.com/en/contactus">Contact Us</a>
          </div>

          {/* 🔹 Column 2 */}
          <div className="footer__column">
            <a href="https://help.netflix.com/en">Help Center</a>
            <a href="https://jobs.netflix.com/">Jobs</a>
            <a href="https://help.netflix.com/legal/privacy">Privacy</a>
            <a href="https://fast.com/">Test Speed</a>
          </div>

          {/* 🔹 Column 3 */}
          <div className="footer__column">
            <a href="#">Account</a>
            <a href="#">Ways to Watch</a>
            <a href="#">Cookie Preferences</a>
            <a href="#">Legal Notices</a>
          </div>

          {/* 🔹 Column 4 */}
          <div className="footer__column">
            <a href="#">Media Center</a>
            <a href="#">Gift Cards</a>
            <a href="#">Corporate Information</a>
            <a href="#">Only on Netflix</a>
          </div>
        </div>

        {/* Language Dropdown Selection Box */}
        <div className="footer__languageContainer">
          <FiGlobe className="footer__globeIcon" /> {/* Globe Icon */}
          <select className="footer__langSelect">
            <option value="en">English</option>
            <option value="am">Amharic(አማርኛ)</option>
            <option value="om">Afaan Oromoo</option>
          </select>
        </div>

        {/* Copyright Announcement Line */}
        <p className="footer__copyright">
          © 1997-2026 Netflix, Inc. (Clone Project by Frezer)
        </p>
      </div>
    </div>
  );
}

export default Footer;

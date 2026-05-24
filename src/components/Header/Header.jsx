import React, { useState, useEffect } from "react";
import "./Header.css";
//  ከ FontAwesome እና Material Design ላይብረሪዎች አይኮኖችን ማስገባት
import { FaSearch, FaRegBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

function Header() {
  //  የባክግራውንድ ቀለም ለውጥን ለመቆጣጠር የተዘጋጀ ስቴት
  const [show, handleShow] = useState(false);

  // ተጠቃሚው ገጹን ወደ ታች ሲያወርደው የሚሰራ ሁነት (Scroll Listener)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true); // ከ100px በታች ከወረደ ጥቁር ባክግራውንድ አሳይ
      } else {
        handleShow(false); // ወደ ላይ ሲመለስ ባክግራውንዱን መልሰህ ግልጽ አድርገው
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // የሜሞሪ ብክነትን ለመከላከል ሁነቱን ማጽዳት
    };
  }, []);

  return (
    // ✨ "header__black" ክላስን በሁኔታው ላይ ተመስርቶ በዳይናሚክ መንገድ መጨመር
    <div className={`header ${show && "header__black"}`}>
      <div className="header__contents">
        {/* 📸 ከራሳችን ፕሮጀክት (public/) በቋሚነት የሚነበብ የኔትፍሊክስ ዋና ሎጎ */}
        <img
          className="header__logo"
          src="/netflix-logo.png"
          alt="Netflix Logo"
        />

        {/* ከ react-icons የመጡ አይኮኖች እና የፕሮፋይል ሳጥን */}
        <div className="header__right">
          <FaSearch className="header__icon" /> {/* የፍለጋ አይኮን */}
          <p className="header__navLink">KIDS</p> {/* የህፃናት ገጽ ሊንክ */}
          <FaRegBell className="header__icon" /> {/* የnotification ደወል አይኮን */}
          {/* የተጠቃሚው ፕሮፋይል እና ተቆልቋይ ቀስት */}
          <div className="header__profileContainer">
            {/*  ከራሳችን ፕሮጀክት (public/) በቋሚነት የሚነበብ የፕሮፋይል ፎቶ */}
            <img
              className="header__avatar"
              src="/netflix-avatar.png"
              alt="Netflix Avatar"
            />
            <MdArrowDropDown className="header__dropdownIcon" />{" "}
            {/* ተቆልቋይ ቀስት */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

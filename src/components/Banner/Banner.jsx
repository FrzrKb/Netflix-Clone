import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../axios";
import requests from "../../requests";
import { FaPlay, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Banner() {
  const [moviesList, setMoviesList] = useState([]); // ሁሉንም ፊልሞች ይዞ ለመቆየት
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  // 🔴 ኤፒአይ መጀመሪያ ሲጠራ ሁሉንም ፊልሞች ሴቭ ያደርጋል
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const results = request.data.results;
      setMoviesList(results);

      // መጀመሪያ አንዱን ራንደም ይመርጣል
      setMovie(results[Math.floor(Math.random() * results.length)]);
      return request;
    }
    fetchData();
  }, []);

  // 🔴 1. ባነሩ (ስክሪኑ) ክሊክ ሲደረግ አዲስ ፊልም የሚቀይረው ዋናው ፋንክሽን
  const changeBannerMovie = (e) => {
    // በተኖቹ ወይም ክሎዝ ምልክቱ ሲነካ ባነሩ እንዳይቀየር ለመከላከል (Event Bubbling ለማስቆም)
    if (
      e.target.tagName === "BUTTON" ||
      e.target.closest("button") ||
      e.target.closest(".banner__trailerContainer")
    ) {
      return;
    }

    if (moviesList.length > 0) {
      const randomMovie =
        moviesList[Math.floor(Math.random() * moviesList.length)];
      setMovie(randomMovie);
      setTrailerUrl(""); // አዲስ ፊልም ሲመጣ የድሮው ትሬለር ካለ ይዘጋል
    }
  };

  const handlePlayClick = (e) => {
    e.stopPropagation(); // ወደ ባነሩ ክሊክ እንዳይተላለፍ
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log("Trailer not found: ", error));
    }
  };

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const opts = {
    height: "450",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <>
      {/* 🔴 2. እዚህ ጋር onClick ላይ changeBannerMovie ጨምረናል */}
      <header
        className="banner"
        onClick={changeBannerMovie}
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center top",
          cursor: "pointer" /* ክሊክ መደረግ እንደሚችል ለተጠቃሚው ለማሳየት */,
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          <div className="banner__buttons">
            <button
              className="banner__button banner__buttonPlay"
              onClick={handlePlayClick}
            >
              <FaPlay className="banner__icon" /> Play
            </button>

            <button
              className={`banner__button banner__buttonList ${isAdded ? "banner__buttonList--added" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsAdded(!isAdded);
              }}
            >
              {isAdded ? (
                <>
                  <FaCheck className="banner__icon banner__iconCheck" /> Added
                </>
              ) : (
                <>
                  <FaPlus className="banner__icon" /> My List
                </>
              )}
            </button>
          </div>

          <h1 className="banner__description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>

        <div className="banner--fadeBottom" />
      </header>

      {/* 🔴 3. የቪዲዮው ሳጥን ከባነሩ ስር ራሱን ችሎ ይቀመጣል */}
      {trailerUrl && (
        <div className="banner__trailerContainer">
          <button
            className="banner__closeButton"
            onClick={() => setTrailerUrl("")}
          >
            <FaTimes />
          </button>
          <div className="banner__trailer">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;

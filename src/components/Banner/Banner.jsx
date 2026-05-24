import React, { useState, useEffect } from "react";
// Import our custom axios instance and requests endpoints
import axios from "../../axios";
import requests from "../../requests";
import "./Banner.css";

function Banner() {
  // useState hooks to store the randomly selected movie data
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    // Async function to fetch data from the TMDB API
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      // Select one random movie from the results array
      const randomMovie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ];

      setMovie(randomMovie);
      return request;
    }
    fetchData();
  }, []);

  // Function to truncate long descriptions with "..." just like Netflix does
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* Dynamic movie title or name */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* Action buttons inside the banner */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        {/* Truncated movie description summary */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      {/* Elegant fade out effect at the bottom of the banner */}
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;

import React, { useState, useEffect } from "react";
// Import our custom axios instance to make API requests
import axios from "../../axios";
import "./Row.css";
// Import YouTube player and movie-trailer searcher
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

// Base URL for fetching movie poster images from TMDB
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  // useState hook to store the array of movies fetched from the API
  const [movies, setMovies] = useState([]);
  // State to store the YouTube video ID
  const [trailerUrl, setTrailerUrl] = useState("");

  // useEffect hook to fetch data when the row component loads
  useEffect(() => {
    async function fetchData() {
      // Combine base URL with the specific fetchUrl passed as a prop
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); // Runs again if the fetchUrl prop changes

  // Custom options configurations for the YouTube video player size and autoplay
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1, // Automatically plays the video when it loads
    },
  };

  //  Enhanced function to handle click on a movie poster and search for trailer
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // If a trailer is already open, close it when clicked again
    } else {
      // Check all possible name variations from TMDB API to get an accurate search
      const movieName =
        movie?.title ||
        movie?.name ||
        movie?.original_name ||
        movie?.original_title ||
        "";

      movieTrailer(movieName)
        .then((url) => {
          if (url) {
            // URL example: https://www.youtube.com/watch?v=XtMThy8QKqU
            // We extract the video ID after the 'v=' parameter
            const urlParams = new URLSearchParams(new URL(url).search);
            const videoId = urlParams.get("v");
            if (videoId) {
              setTrailerUrl(videoId);
            }
          } else {
            console.log(`Trailer not found for: ${movieName}`);
          }
        })
        .catch((error) => console.log("Error finding trailer: ", error));
    }
  };

  return (
    <div className="row">
      {/* Row title (e.g., NETFLIX ORIGINALS, Trending Now) */}
      <h2>{title}</h2>

      <div className="row__posters">
        {/* Loop through the movies array using map */}
        {movies.map((movie) => (
          <img
            key={movie.id} /* Optimization for React rendering list items */
            //  Add onClick event listener to trigger the handleClick function
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name || movie.title}
          />
        ))}
      </div>

      {/* Render the YouTube player dynamically below the row if trailerUrl exists */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;

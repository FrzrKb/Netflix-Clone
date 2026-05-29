import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [activeMovieId, setActiveMovieId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    const movieName =
      movie?.title ||
      movie?.name ||
      movie?.original_name ||
      movie?.original_title ||
      "";

    if (trailerUrl && activeMovieId === movie.id) {
      // ያንኑ ፊልም ድጋሚ ከነካው ይዘጋል
      handleCloseTrailer();
    } else {
      movieTrailer(movieName)
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            const videoId = urlParams.get("v");
            if (videoId) {
              setTrailerUrl(videoId);
              setActiveMovieId(movie.id);
            }
          } else {
            console.log(`Trailer not found for: ${movieName}`);
            handleCloseTrailer();
          }
        })
        .catch((error) => {
          console.log("Error finding trailer: ", error);
          handleCloseTrailer();
        });
    }
  };

  // 🔴 1. ቪዲዮውን ሙሉ በሙሉ የሚዘጋ አዲስ ፈንክሽን
  const handleCloseTrailer = () => {
    setTrailerUrl("");
    setActiveMovieId(null);
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name || movie.title}
          />
        ))}
      </div>

      {/* 🔴 2. ቪዲዮው ክፍት ሲሆን ከመዝጊያ በተን ጋር አብሮ እንዲወጣ Wrapper Container አድርገነዋል */}
      {trailerUrl && (
        <div className="row__youtubeWrapper">
          <button className="row__closeButton" onClick={handleCloseTrailer}>
            ✕ Close Video
          </button>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;

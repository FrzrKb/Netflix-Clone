import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "../../axios";
import requests from "../../requests";
import SignUp from "../SignUp/SignUp";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 🔴 RESTORED: Mandatory routing trigger

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFormFading, setIsFormFading] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); //  INITIALIZED: Prevents runtime rendering collapse

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await axios.get(requests.fetchTrending);
        setMoviesList(response.data.results.slice(0, 16));
      } catch (err) {
        console.log("Error fetching login background collage:", err);
      }
    }
    fetchTrendingMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      // this code sent requests to the server after the user click sign in button
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // this code allow to accept response from the server after the user click sign in button
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("netflixToken", data.token);

      setIsFadingOut(true);
      setTimeout(() => {
        onLoginSuccess();
        navigate("/"); // Smooth transition out into the secure route tree
      }, 600);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  const handleGoToSignUp = () => {
    setIsFormFading(true);
    setTimeout(() => {
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setIsSignUp(true);
      setIsFormFading(false);
    }, 250);
  };

  const handleBackToSignIn = () => {
    setIsFormFading(true);
    setTimeout(() => {
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setIsSignUp(false);
      setIsFormFading(false);
    }, 250);
  };

  return (
    <div className={`loginScreen ${isFadingOut ? "loginScreen--fadeOut" : ""}`}>
      <div className="loginScreen__movieGrid">
        {moviesList.map((movie) => (
          <div
            key={movie.id}
            className="loginScreen__gridItem"
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}")`,
            }}
          />
        ))}
      </div>

      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
        <div className="loginScreen__gradient" />
      </div>

      <div
        className={`loginScreen__container ${isFormFading ? "loginScreen__container--fade" : ""}`}
      >
        {isSignUp ? (
          <SignUp
            onSignUpSuccess={onLoginSuccess}
            onBackToLogin={handleBackToSignIn}
          />
        ) : (
          <div className="loginScreen__body">
            <form onSubmit={handleSubmit}>
              <h1 className="Sign_in_h1">Sign In</h1>
              {errorMessage && (
                <div className="loginScreen__errorBox">{errorMessage}</div>
              )}

              <div className="loginScreen__inputWrapper">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder=" "
                />
                <label htmlFor="email">Email Address</label>
              </div>

              <div className="loginScreen__inputWrapper loginScreen__passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder=" "
                />
                <label htmlFor="password">Password</label>

                <span
                  className="loginScreen__visibilityToggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <button
                type="submit"
                className="loginScreen__signInButton"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              <div className="loginScreen__help">
                <div className="loginScreen__remember">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <p>Need help?</p>
              </div>

              <div className="loginScreen__textLink">
                <span className="gray">Are you new to Netflix?</span>{" "}
                <span
                  className="loginScreen__signUpLink"
                  onClick={handleGoToSignUp}
                >
                  Sign up now.
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

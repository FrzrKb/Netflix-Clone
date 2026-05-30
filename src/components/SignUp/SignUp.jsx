import React, { useState } from "react";
import "./SignUp.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp({ onSignUpSuccess, onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("netflixToken", data.token);
      onSignUpSuccess();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signUpScreen">
      <div className="signUpScreen__body">
        <form onSubmit={handleSubmit}>
          <h1 className="Create_title">Create New Account</h1>

          {errorMessage && (
            <div className="signUpScreen__errorBox">{errorMessage}</div>
          )}

          {/* 1. Dummy fields to trick browser password autocomplete extensions.
              This prevents stored sign-in combinations from overriding clean entries. */}
          <input
            type="text"
            name="chrome-autofill-dummy1"
            style={{ display: "none" }}
          />
          <input
            type="password"
            name="chrome-autofill-dummy2"
            style={{ display: "none" }}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="off"
          />

          {/* Password Security Wrapper */}
          <div className="signUpScreen__passwordWrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="new-password"
            />
            <span
              className="signUpScreen__visibilityToggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Verification Password Wrapper */}
          <div className="signUpScreen__passwordWrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="new-password"
            />
            <span
              className="signUpScreen__visibilityToggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button
            type="submit"
            className="signUpScreen__button"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Sign Up"}
          </button>

          <div className="signUpScreen__textLink">
            <span className="gray">Already have an account?</span>{" "}
            <span className="signUpScreen__signInLink" onClick={onBackToLogin}>
              Sign in now.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Importing layout components
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Row from "./components/Row/Row";
import requests from "./requests";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";

function App() {
  // 1. Verify user session persistence from localStorage on initial load
  const [userLoggedIn, setUserLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem("userLoggedIn");
    return savedLoginStatus === "true";
  });

  // 2. Trigger active session locking upon validation confirmation
  const handleLoginSuccess = () => {
    setUserLoggedIn(true);
    localStorage.setItem("userLoggedIn", "true");
  };

  // 3. Clear existing security tokens and session locks on sign-out
  const handleLogout = () => {
    setUserLoggedIn(false);
    localStorage.removeItem("userLoggedIn");
  };

  return (
    // Router (BrowserRouter): Context provider wrapping the navigation framework
    <Router>
      <div className="app">
        {/* Routes: Matches current window locations against structural path branches */}
        <Routes>
          {/* 🛣️ Route 1: Authentication Gateway Screen */}
          <Route
            path="/login"
            element={
              !userLoggedIn ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <Navigate to="/" /> /* Automatically bypass gateway if token signature is active */
              )
            }
          />

          {/* 🛣️ Route 2: Core Dashboard Feature Display (Home View) */}
          <Route
            path="/"
            element={
              userLoggedIn ? (
                <>
                  <Header onLogout={handleLogout} />
                  <Banner />
                  <Row
                    title="NETFLIX ORIGINALS"
                    fetchUrl={requests.fetchNetflixOriginals}
                    isLargeRow={true}
                  />
                  <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                  <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                  <Row
                    title="Action Movies"
                    fetchUrl={requests.fetchActionMovies}
                  />
                  <Row
                    title="Comedy Movies"
                    fetchUrl={requests.fetchComedyMovies}
                  />
                  <Row
                    title="Horror Movies"
                    fetchUrl={requests.fetchHorrorMovies}
                  />
                  <Row
                    title="Romance Movies"
                    fetchUrl={requests.fetchRomanceMovies}
                  />
                  <Row
                    title="Documentaries"
                    fetchUrl={requests.fetchDocumentaries}
                  />
                  <Footer />
                </>
              ) : (
                <Navigate to="/login" /> /* Force baseline re-route for unauthenticated traffic */
              )
            }
          />

          {/* 🛣️ Fallback Route: Intercepts undefined paths and redirects based on log state */}
          <Route
            path="*"
            element={<Navigate to={userLoggedIn ? "/" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

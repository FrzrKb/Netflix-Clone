import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Row from "./components/Row/Row";
// Import the requests object containing all TMDB endpoints
import requests from "./requests";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app">
      {/* Navbar header */}
      <Header />

      {/* Main movie feature display */}
      <Banner />

      {/* 🎬 Movie Categories Rows */}
      {/* Netflix Originals with tall vertical posters */}
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />

      {/* Regular categories with horizontal posters */}
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default App;

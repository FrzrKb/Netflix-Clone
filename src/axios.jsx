import axios from "axios";

// Create an instance of axios with the TMDB base URL
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;

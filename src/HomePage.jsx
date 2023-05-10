import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function HomePage() {
  console.log("homepage rendered");

  const [movieQuery, setMovieQuery] = useState("");
  const [movieResultArr, setMovieResultArr] = useState([]);
  const [showPopular, setShowPopular] = useState(true);

  const getPopularMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=6af31bc37cbb2436640ecaf1e1265fdc"
    )
      .then((res) => res.json())
      .then((data) => {
        setShowPopular(true);
        // console.log(data.results);
        setMovieResultArr(data.results);
      })
      .catch((error) => console.error(error));
  };

  React.useEffect(() => {
    getPopularMovies();
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    const valueCleaned = value.replace(/\s/g, "+");
    // console.log(valueCleaned)
    setMovieQuery(valueCleaned);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPopular(false);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=6af31bc37cbb2436640ecaf1e1265fdc&query=${movieQuery}`
    );
    const data = await response.json();
    // console.log(data);
    setMovieResultArr(data.results);
  };

  return (
    <div className="homepage-wrapper">
      <Header getPopularMovies={getPopularMovies} />
      <h1></h1>
      <form className="movie-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          name="movieName"
          id="movieName"
          placeholder="e.g: The Godfather"
          type="text"
          onChange={handleChange}
          required
        ></input>
        <button type="submit" className="btn submit-btn">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      {showPopular ? (
        <p className="popular-movies">Popular Movies</p>
      ) : (
        <p className="search-results">Search Results</p>
      )}
      <div className="movie-gallery">
        {movieResultArr
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Link
              className="movies-link"
              to={`/${movie.id}`}
              key={movie.id}
              state={movieResultArr}
            >
              <MovieCard data={movie} />
            </Link>
          ))}
      </div>
    </div>
  );
}

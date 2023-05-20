import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";

import { getPopularMovies } from "./api";
import { useLoaderData, NavLink } from "react-router-dom";

export function loader() {
  return getPopularMovies();
}

export default function HomePage() {
  // console.log("homepage rendered");

  const loaderData = useLoaderData();

  const [movieQuery, setMovieQuery] = useState("");
  const [movieResultArr, setMovieResultArr] = useState([]);
  const [showPopular, setShowPopular] = useState(true);

  React.useEffect(() => {
    setMovieResultArr(loaderData.results);

    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=6af31bc37cbb2436640ecaf1e1265fdc"
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    // const valueCleaned = value.replace(/\s/g, "+");
    // console.log(valueCleaned)
    setMovieQuery(value);
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
      <form className="movie-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          name="movieName"
          id="movieName"
          value={movieQuery}
          placeholder="e.g: The Godfather"
          type="text"
          onChange={handleChange}
          required
        ></input>
        <button type="submit" className="btn submit-btn">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>

      <NavLink className="filters-div">
        <button className="filter-btn">Popular</button>
        <button className="filter-btn">Now Playing</button>
        <button className="filter-btn">Top Rated</button>
        <button className="filter-btn">Upcoming</button>
      </NavLink>

      {/* Network error */}
      {movieResultArr.length <= 0 ? <h1>Loading...</h1> : null}

      {showPopular ? (
        <p className="popular-movies">Popular Movies</p>
      ) : (
        <p className="search-results">Search Results</p>
      )}

      <div className="movie-gallery">
        {movieResultArr
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard data={movie} key={movie.id} />
          ))}
      </div>
    </div>
  );
}

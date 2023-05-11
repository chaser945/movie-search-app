import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MovieDetails() {
  const location = useLocation();
  const selectedMovie = location.state;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  //   console.log(param.id);
  //   console.log(selectedMovie);
  return (
    <div className="movie-details-card">
      <img
        className="movie-details-img"
        src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
        atl={selectedMovie.title}
      ></img>
      <div className="movie-details-content">
        <h3 className="movie-details-header">{selectedMovie.title}</h3>
        <p className="rating-wrapper">
          <i className="fa-star">
            <FontAwesomeIcon icon={faStar} />
          </i>
          <span className="movie-details-rating">
            {selectedMovie.vote_average.toFixed(1)} (IMDb)
          </span>
        </p>
        <div>
          <h3 className="release-date-h3">Release date</h3>
          <span className="release-date-span">
            {selectedMovie.release_date}
          </span>
        </div>
        <div>
          <h3 className="synopsis">Synopsis</h3>
          <p className="synopsis-p">{selectedMovie.overview}</p>
        </div>
      </div>
    </div>
  );
}

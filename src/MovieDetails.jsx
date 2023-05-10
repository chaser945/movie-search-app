import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MovieDetails() {
  const param = useParams();
  const location = useLocation();
  const selectedMovie = location.state.filter((movie) => movie.id == param.id);

  //   console.log(param.id);
  //   console.log(selectedMovie);
  return (
    <div className="movie-details-card">
      <img
        className="movie-details-img"
        src={`https://image.tmdb.org/t/p/w500${selectedMovie[0].poster_path}`}
        atl={selectedMovie[0].title}
      ></img>
      <div className="movie-details-content">
        <h3 className="movie-details-header">{selectedMovie[0].title}</h3>
        <p className="rating-wrapper">
          <i className="fa-star">
            <FontAwesomeIcon icon={faStar} />
          </i>
          <span className="movie-details-rating">
            {selectedMovie[0].vote_average.toFixed(1)} (IMDb)
          </span>
        </p>
        <div>
          <h3 className="release-date-h3">Release date</h3>
          <span className="release-date-span">
            {selectedMovie[0].release_date}
          </span>
        </div>
        <div>
          <h3 className="synopsis">Synopsis</h3>
          <p className="synopsis-p">{selectedMovie[0].overview}</p>
        </div>
      </div>
    </div>
  );
}

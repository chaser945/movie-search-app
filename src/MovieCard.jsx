import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard(props) {
  return (
    <div className="movie-card">
      <Link className="movies-link" to={`/${props.data.id}`} state={props.data}>
        <img
          className="movie-card-img"
          src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`}
        />
        <p className="movie-title">
          {props.data.title}
          <span className="movie-release-date">
            {" "}
            ({props.data.release_date.split("-")[0]})
          </span>
        </p>
      </Link>
    </div>
  );
}

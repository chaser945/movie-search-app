import React from "react";

export default function Header({ getPopularMovies }) {
  return (
    <div onClick={getPopularMovies}>
      <h1 className="header">Find Movies, Tv series, and more..</h1>
    </div>
  );
}

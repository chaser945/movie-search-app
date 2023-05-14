import "./styles.css";
import HomePage from "./HomePage";
import MovieDetails from "./MovieDetails";

import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { loader as homePageLoader } from "./HomePage";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<HomePage />} loader={homePageLoader} />
        <Route path="/:id" element={<MovieDetails />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

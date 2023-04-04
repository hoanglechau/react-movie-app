import * as React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../layouts/MainLayout";
import Favorites from "../pages/Favorites";
import FormPage from "../pages/Form";
import Homepage from "../pages/Homepage";
import MovieDetails from "../pages/MovieDetails";
import NoMatch from "../pages/NoMatch";
import PersonDetails from "../pages/PersonDetails";
import PopularMovies from "../pages/PopularMovies";
import PopularPeople from "../pages/PopularPeople";
import PopularTvShows from "../pages/PopularTvShows";
import TvShowDetails from "../pages/TvShowDetails";

function RequireAuth({ children }) {
  let location = useLocation();
  let auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/form" state={{ from: location }} replace />;
  }
  return children;
}

function Router() {
  let location = useLocation();
  let state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="movie/popular/:pageId" element={<PopularMovies />} />
          <Route path="movie/:movieId" element={<MovieDetails />} />
          <Route path="tv/popular/:pageId" element={<PopularTvShows />} />
          <Route path="tv/:tvId" element={<TvShowDetails />} />
          <Route path="person/popular/:pageId" element={<PopularPeople />} />
          <Route path="person/:personId" element={<PersonDetails />} />
          <Route path="form" element={<FormPage />} />
          <Route path="*" element={<NoMatch />} />
          <Route
            path="/favorite"
            element={
              <RequireAuth>
                <Favorites />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/form" element={<FormPage />} />
        </Routes>
      )}
    </>
  );
}

export default Router;
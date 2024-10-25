import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "./MovieCard";
import { fetchMovies } from "../redux/moviesSlice";
import Filter from "./Filter";
import Pagination from "./Pagination";
import "../styles/MovieList.css";
import { selectPaginatedMovies } from "../redux/moviesSlice";

const MovieList = () => {
  const paginatedMovies = useSelector(selectPaginatedMovies);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="list-container">
      <Filter categories={categories} />
      <div className="movie-list">
        {paginatedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      <Pagination />
    </div>
  );
};

export default MovieList;

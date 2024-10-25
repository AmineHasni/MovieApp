import React from "react";
import "../styles/MovieCard.css";
import { useDispatch } from "react-redux";
import { toggleLikeDislike, deleteMovie } from "../redux/moviesSlice";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(toggleLikeDislike({ id: movie.id, type: "like" }));
  };

  const handleDislike = () => {
    dispatch(toggleLikeDislike({ id: movie.id, type: "dislike" }));
  };
  
  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <p>Catégorie: {movie.category}</p>
      <p>Likes: {movie.likes} Dislikes: {movie.dislikes}</p>
      <div>
      <button
        onClick={handleLike}
        style={{ color: movie.isLiked ? "blue" : "black" }}
      >
        👍 Like
      </button>
      <button
        onClick={handleDislike}
        style={{ color: movie.isDisliked ? "red" : "black" }}
      >
        👎 Dislike
      </button>
      </div>
      
      <button className="delete-btn" onClick={() => dispatch(deleteMovie(movie.id))}>Supprimer</button>
    </div>
  );
};

export default MovieCard;

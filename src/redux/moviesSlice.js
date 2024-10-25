import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movies$ } from "../movies";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const movies = await movies$;
  return movies;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    filteredMovies: [],
    selectedCategories: [],
    currentPage: 1,
    itemsPerPage: 4,
    status: "idle",
    error: null,
  },
  reducers: {
    deleteMovie: (state, action) => {
      const movieId = action.payload;
      state.movies = state.movies.filter((movie) => movie.id !== movieId);
      state.filteredMovies = state.filteredMovies.filter(
        (movie) => movie.id !== movieId
      );

      // mettre à jour la liste des catégories en fonction des films restants
      const remainingCategories = [
        ...new Set(state.movies.map((movie) => movie.category)),
      ];
      state.selectedCategories = state.selectedCategories.filter((category) =>
        remainingCategories.includes(category)
      );
      state.currentPage = 1; // réinitialiser à la première page après suppression
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // réinitialiser à la première page lors du changement d'éléments par page
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    filterByCategory: (state, action) => {
      const selectedCategories = action.payload;
      state.selectedCategories = selectedCategories;

      if (selectedCategories.length === 0) {
        // si aucune catégorie n'est sélectionnée, afficher tous les films
        state.filteredMovies = state.movies;
      } else {
        state.filteredMovies = state.movies.filter((movie) =>
          selectedCategories.includes(movie.category)
        );
      }

      state.currentPage = 1; // réinitialiser à la première page lors du changement de catégorie
    },

    toggleLikeDislike: (state, action) => {
      const { id, type } = action.payload;

      // mettre à jour les mentions like dilike dans les tableaux de films et de films filtrés
      const updateLikesDislikes = (moviesArray) => {
        const movie = moviesArray.find((movie) => movie.id === id);
        if (movie) {
          if (type === "like") {
            if (movie.isLiked) {
              // supprimer like
              movie.likes -= 1;
              movie.isLiked = false;
            } else {
              // ajouter like, supprimer dislike s'il a été sélectionné précédemment
              movie.likes += 1;
              if (movie.isDisliked) {
                movie.dislikes -= 1;
                movie.isDisliked = false;
              }
              movie.isLiked = true;
            }
          } else if (type === "dislike") {
            if (movie.isDisliked) {
              // supprimer dislike
              movie.dislikes -= 1;
              movie.isDisliked = false;
            } else {
              // ajouter dislike, supprimer like s'il a été sélectionné précédemment
              movie.dislikes += 1;
              if (movie.isLiked) {
                movie.likes -= 1;
                movie.isLiked = false;
              }
              movie.isDisliked = true;
            }
          }
        }
      };

      updateLikesDislikes(state.movies); // mise à jour dans le tableau des films
      updateLikesDislikes(state.filteredMovies); // mise à jour dans le tableau filteredMovies
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload.map((movie) => ({
        ...movie,
        isLiked: false,
        isDisliked: false,
      }));
      state.filteredMovies = [...state.movies];
    });
  },
});

export const {
  deleteMovie,
  toggleLikeDislike,
  filterByCategory,
  setItemsPerPage,
  setCurrentPage,
} = moviesSlice.actions;
// sélecteur de films paginés
export const selectPaginatedMovies = (state) => {
  const startIndex = (state.movies.currentPage - 1) * state.movies.itemsPerPage;
  const endIndex = startIndex + state.movies.itemsPerPage;
  return state.movies.filteredMovies.slice(startIndex, endIndex);
};

// sélecteur pour le nombre total de pages
export const selectTotalPages = (state) => {
  return Math.ceil(
    state.movies.filteredMovies.length / state.movies.itemsPerPage
  );
};
export const selectCategories = (state) => {
  const uniqueCategories = [
    ...new Set(state.movies.movies.map((movie) => movie.category)),
  ];
  return ["All Categories", ...uniqueCategories];
};

export default moviesSlice.reducer;

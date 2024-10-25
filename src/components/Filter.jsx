import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, selectCategories } from "../redux/moviesSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  // obtenez des catégories uniques de manière dynamique à partir de la liste des films
  const categories = [...new Set(movies.map((movie) => movie.category))];

  const selectedCategories = useSelector(
    (state) => state.movies.selectedCategories
  );

  const handleCategoryChange = (category) => {
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      // supprimer la catégorie si elle est déjà sélectionnée
      updatedCategories = selectedCategories.filter((cat) => cat !== category);
    } else {
      // ajouter une catégorie à la sélection
      updatedCategories = [...selectedCategories, category];
    }
    dispatch(filterByCategory(updatedCategories));
  };

  return (
    <div>
      {categories.map((category) => (
        <label key={category} style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          {category}
        </label>
      ))}
    </div>
  );
};

export default Filter;

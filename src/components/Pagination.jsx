import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setItemsPerPage } from "../redux/moviesSlice";
import { selectTotalPages } from "../redux/moviesSlice";
import "../styles/Pagination.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const itemsPerPage = useSelector((state) => state.movies.itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    dispatch(setItemsPerPage(newItemsPerPage));
    dispatch(setCurrentPage(1)); // réinitialiser à la première page en cas de changement
  };
  return (
    <div className="pagination-container">
      <select className="custom-select" onChange={handleItemsPerPageChange} value={itemsPerPage}>
        <option value={4}>4 films par page</option>
        <option value={8}>8 films par page</option>
        <option value={12}>12 films par page</option>
      </select>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Page Précédente
        </button>
        <span>
          {" "}
          Page {currentPage} sur {totalPages}{" "}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Page Suivante
        </button>
      </div>
    </div>
  );
};

export default Pagination;

import React from "react";
import "./SearchForm.css";

function SearchForm({
  searchPostalCode,
  setSearchPostalCode,
  getEquipments,
  currentPage,
  setCurrentPage,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentPage === 1) {
      getEquipments(1, searchPostalCode);
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPostalCode}
        onChange={(e) => setSearchPostalCode(e.target.value)}
        placeholder="Entrez le code postal"
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}

export default SearchForm;

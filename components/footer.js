export const updatePagination = () => {
  const footer = document.getElementById("footer");
  const prevButton = `<button onclick="prevPage()">Prev</button>`;
  const nextButton = `<button onclick="nextPage()">Next</button>`;
  const paginationText = `<p>Page ${currentPage} of ${totalPages}</p>`;
  footer.innerHTML = prevButton + paginationText + nextButton;
};

export const prevPage = () => {
  if (currentPage > 1) {
    fetchPokemon(currentPage - 1);
  }
};

export const nextPage = () => {
  if (currentPage < totalPages) {
    fetchPokemon(currentPage + 1);
  }
};

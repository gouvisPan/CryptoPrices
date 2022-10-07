import View from "./view";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerPageChange(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.currentPage;
    const totalPages = Math.ceil(
      this._data.cryptoInfo.length / this._data.resultsPerPage
    );
   
    if (curPage === 1 && totalPages > 1)
      return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline  pagination__btn--next">
    <span>Page ${curPage + 1}</span>
 
  </button> 
    `;

    if (totalPages > 1 && curPage === totalPages)
      return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline  pagination__btn--prev">
            <span>Page${curPage - 1}</span>
          </button>
    `;

    if (curPage < totalPages)
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline  pagination__btn--prev">
         
            <span>Page ${curPage - 1}</span>
          </button>

          <button data-goto="${
            curPage + 1
          }" class="btn--inline  pagination__btn--next">
            <span>Page ${curPage + 1}</span>
    
          </button> 
    `;

    return ``;
  }
}

export default new PaginationView();

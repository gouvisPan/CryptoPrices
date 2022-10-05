class SearchView {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const input = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return input;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }
}

export default new SearchView();

import View from "./view";

class CryptoListView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage =
    "Could not match any coin/token to your search... Please try with a different query!";

  _generateMarkup() {
    return this._data.map((d) => {
      return ` <li class="preview">
                    <a class="preview__link preview__link--active" href="#${d.id}">
                    <div class="preview__data">
                        <h4 class="preview__title">${d.name}</h4>
                        <p class="preview__publisher">${d.price}</p>
                        <div class="preview__user-generated">
                        </div>
                    </div>
                    </a>
                 </li>`;
    });
  }
}

export default new CryptoListView();

import View from "./view";
import svg from "../../../node_modules/cryptocurrency-icons/svg"

class CryptoListView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage =
    "Could not match any coin/token to your search... Please try with a different query!";

  _generateMarkup() {
    return this._data.map( d=> {
      return `<li class="preview">
      <a class="preview__link preview__link--active" href="#${d.id}">
      <div class="preview__data">
          <div class="preview__rank">${d.rank}</div>
          <div class="preview__title"> 
            <h4 class="preview__name">${d.name}</h4>
            <h2 class="preview__symbol">(${d.symbol.toUpperCase()})</h2>
            <svg>
              <use href="../../../node_modules/cryptocurrency-icons/svg/white/${d.symbol}"></use>
              </svg>
          </div>
          <p class="preview__price">$${d.price}</p>

      </div>
      </a>
   </li>`;
    }).join("");
  }
}

export default new CryptoListView();

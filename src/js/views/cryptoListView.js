import View from "./view";

class CryptoListView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage =
    "Could not match any coin/token to your search... Please try with a different query!";

  _generateMarkup() {
    return [ `<li class="preview">
    <div class="preview__data">
        <div class="preview__rank">Rank</div>
        <div class="preview__title"> 
          <h4 class="preview__name" style="font-size:1.2rem;margin-left:.5rem" >Coin/Token</h4>
        </div>
        <p class="preview__price">Price</p>

    </div>
    </a>
 </li>` , this._data.map( d=> {
      return `<li class="preview">
      <a class="preview__link preview__link--active" href="#${d.id}">
      <div class="preview__data">
          <div class="preview__rank">${d.rank}</div>
          <div class="preview__title"> 
            <h4 class="preview__name">${d.name}</h4>
            <h2 class="preview__symbol">(${d.symbol.toUpperCase()})</h2>
          </div>
          <p class="preview__price">$${d.price}</p>

      </div>
      </a>
   </li>`;
    }).join("")].join("");
  }
}
// <img src=./node_modules/cryptocurrency-icons/svg/white/aave.svg/>${d.symbol.toLowerCase()}"/>
export default new CryptoListView();

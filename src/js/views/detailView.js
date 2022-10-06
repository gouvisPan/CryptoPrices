import View from "./view";
import favicon from "../../img/favicon.png"

class DetailView extends View {
  _parentEl = document.querySelector(".details");
  _errorMessage = "Did not find details for this item :(";

  loadCoinDetails(data) {
    console.log(data);
    this._data = data;
  }

  addHandlerDetails(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerAddFavorite(handler) {
    this._parentEl.addEventListener("click", e =>{
      const btn = e.target.closest()
    })
  }


  _generateMarkup() {
    const percClass = this._data.priceChangePerc > 0 ? "--g" : "--r";

    const largeNumFormater = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });

    return `
    <div class="crypto-details__top">
        <div class="crypto-details__top__header">
        <img src="${this._data.img}" class="crypto-details__top__header__img"/>
        <span class="crypto-details__top__header__name">${
          this._data.name
        } </span>
        <span class="crypto-details__top__header__symbol">(${this._data.symbol.toUpperCase()})</span>
        <img src = "${favicon}" class="crypto-details__top__header__fav"/>
        </div>
        <div class="crypto-details__top__price">        
          <span class="crypto-details__top__price__value">${largeNumFormater.format(
            this._data.price
          )}</span>
          <span class="crypto-details__top__price__perc${percClass}">(${
      this._data.priceChangePerc > 0
        ? ["+", this._data.priceChangePerc.toFixed(2)].join("")
        : this._data.priceChangePerc.toFixed(2)
    }%)</span>
        </div>
    </div>
    <div class="crypto-details__bottom">
        <li class="crypto-details__bottom__fixed">ATH</li>
        <li class="crypto-details__bottom__data">$${this._data.ath} </li>

        ${
          this._data.fromAthPerc < 0
            ? `<li class ="crypto-details__bottom__fixed">From ATH</li> `
            : ""
        }
        ${
          this._data.fromAthPerc < 0
            ? `<li class="crypto-details__bottom__data">${this._data.fromAthPerc.toFixed(
                2
              )}%</li> `
            : ""
        }
       
        <li class="crypto-details__bottom__fixed">Market Cap</li>
        <li class="crypto-details__bottom__data">${largeNumFormater.format(
          this._data.marketCap
        )} (#${this._data.rank})</li>
        
        <li class="crypto-details__bottom__fixed">Volume 24h</li>
        <li class="crypto-details__bottom__data">${largeNumFormater.format(
          this._data.volume24h
        )}</li>
        
        <li class="crypto-details__bottom__fixed">Circ. supply</li>
        <li class="crypto-details__bottom__data">${
          this._data.circulatingSupply
        }</li>
        
        <li class="crypto-details__bottom__fixed">Total supply</li>
        <li class="crypto-details__bottom__data">${
          this._data.totalSupply ? this._data.totalSupply : "-"
        }</li>
       
    </div>
    `;
  }
}

export default new DetailView();

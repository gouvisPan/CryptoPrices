import View from "./view";

class DetailView extends View {
  _parentEl = document.querySelector(".crypto-details");
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

  _generateMarkup() {
    const  percClass=
    this._data.priceChangePerc > 0 ? "--g" : "--r"

    const largeNumFormater = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });
     
    return `
    <div class="crypto-details__top">
        <span class="crypto-details__top__name">${this._data.name} (${this._data.symbol.toUpperCase()})</span>
        <div class="crypto-details__top__price">
          <span class="crypto-details__top__price__value">$${this._data.price}</span>
          <span class="crypto-details__top__price__perc${percClass}">(${this._data.priceChangePerc > 0 ?  ["+",this._data.priceChangePerc.toFixed(2)].join("") : this._data.priceChangePerc.toFixed(2)}%)</span>
        </div>
    </div>
    <div class="crypto-details__bottom">
        <li>ATH: ${this._data.ath} </li>
        ${this._data.fromAthPerc < 0 ? `<li>From ATH:  ${this._data.fromAthPerc.toFixed(2)}%</li> ` : "" }
       
        <li classname="${percClass}">${largeNumFormater.format(this._data.marketCap)}</li>
        <li>Market Cap: ${largeNumFormater.format(this._data.volume24h)} (#${this._data.rank})</li>
        <li>${this._data.circulatingSupply}</li>
        <li>${this._data.totalSupply ? this._data.totalSupply : "-"}</li>
       
    </div>
    `;
  }
}

export default new DetailView();

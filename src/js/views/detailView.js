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
    return `
    <div class="details-top">
        <span>${this._data.name} (${this._data.symbol.toUpperCase()})</span>
        <span>${this._data.price} </span> <span>${this._data.name} </span>
        <li>${this._data.ath} </li>
        <li>${this._data.fromAthPerc} </li>
    </div>
    <div class="details-bottom">
       
        <li>${this._data.marketCap}</li>
        <li>${this._data.volume24h}</li>
        <li>${this._data.circulatingSupply}</li>
        <li>${this._data.totalSupply ? this._data.totalSupply : "-"}</li>
       
    </div>
    `;
  }
}

export default new DetailView();

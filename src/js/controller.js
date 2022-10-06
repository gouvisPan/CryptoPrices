import * as model from "./model";
import cryptoListView from "./views/cryptoListView";
import detailView from "./views/detailView";
import paginationView from "./views/paginationView";
import searchView from "./views/searchView";

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

const controlList = async function () {
  try {
    cryptoListView.renderSpinner();

    await model.fetchCryptoInfo();

    cryptoListView.render(model.getCryptoPage());
    paginationView.render(model.state.search);

    console.log(model.state.activeCoin);
    detailView.render(model.state.activeCoin);
  } catch (err) {
    console.log(err);
  }
};

const controlDetails = function () {
  const id = window.location.hash.slice(1);

  model.loadCoinDetails(id);
  detailView.render(model.state.activeCoin);
};

const goToPage = function (page) {
  cryptoListView.render(model.getCryptoPage(page));
  paginationView.render(model.state.search);
};

const controlSearch = async function () {
  try {
    detailView.renderSpinner();

    const query = searchView.getQuery();

    await model.searchCrypto(query);

    console.log(model.state.activeCoin);
    detailView.render(model.state.activeCoin);
  } catch (err) {
    console.log(err);
  }
};

const controlFavorite = function (){
  model.addFavorite();
  detailView.render(model.state.activeCoin);
}


const init = function () {
  detailView.addHandlerDetails(controlDetails);
  paginationView.addHandlerPageChange(goToPage);
  searchView.addHandlerSearch(controlSearch);
};

controlList();
init();

model.searchCrypto("ethereum");

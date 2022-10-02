import * as model from "./model";
import cryptoListView from "./views/cryptoListView";
import detailView from "./views/detailView";
import paginationView from "./views/paginationView";

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

const controlSearch = async function () {
  try {
    cryptoListView.renderSpinner();

    await model.fetchCryptoInfo();

    cryptoListView.render(model.getCryptoPage());
    paginationView.render(model.state.search);

    detailView.render(model.state.search.cryptoInfo[0]);
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

const init = function () {
  detailView.addHandlerDetails(controlDetails);
  paginationView.addHandlerPageChange(goToPage);
};

controlSearch();
init();

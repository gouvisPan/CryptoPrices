import { getJSON } from "../js/helpers";
import { API_BASE_URL, API_100_LARGEST_URL, RESULTS_PER_PAGE } from "./config";

export const state = {
  search: {
    cryptoInfo: [],
    resultsPerPage: RESULTS_PER_PAGE,
    currentPage: 1,
  },
  activeCoin: {},
};

export const fetchCryptoInfo = async function () {
  try {
    const data = await getJSON(`${API_BASE_URL}${API_100_LARGEST_URL}`);

    this.state.search.cryptoInfo = data.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol,
      marketCap: coin.market_cap,
      name: coin.name,
      price: coin.current_price,
      priceChangePerc: coin.price_change_percentage_24h ,
      volume24h: coin.total_volume,
      rank: coin.market_cap_rank,
      circulatingSupply: coin.circulating_supply,
      totalSupply: coin.max_supply,
      ath: coin.ath,
      fromAthPerc: coin.ath_change_percentage,
    }));
  } catch (err) {
    console.log(err);
  }
};

export const loadCoinDetails = function (id) {
  this.state.activeCoin = this.state.search.cryptoInfo.find(
    (coin) => coin.id === id
  );
};

export const getCryptoPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;

  const first = (page - 1) * state.search.resultsPerPage;
  const last = page * state.search.resultsPerPage;

  return state.search.cryptoInfo.slice(first, last);
};

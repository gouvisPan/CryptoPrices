import { getJSON } from "../js/helpers";
import { API_BASE_URL, API_100_LARGEST_URL, RESULTS_PER_PAGE } from "./config";

export const state = {
  search: {
    cryptoInfo: [],
    resultsPerPage: RESULTS_PER_PAGE,
    currentPage: 1,
  },
  activeCoin: {},
  favorites: []
};

export const fetchCryptoInfo = async function () {
  try {
    const data = await getJSON(`${API_BASE_URL}${API_100_LARGEST_URL}`);

    state.search.cryptoInfo = data.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol,
      marketCap: coin.market_cap,
      img: coin.image,
      name: coin.name,
      price: coin.current_price,
      priceChangePerc: coin.price_change_percentage_24h,
      volume24h: coin.total_volume,
      rank: coin.market_cap_rank,
      circulatingSupply: coin.circulating_supply,
      totalSupply: coin.max_supply,
      ath: coin.ath,
      fromAthPerc: coin.ath_change_percentage,
    }));
    state.activeCoin = state.search.cryptoInfo[0];
  } catch (err) {
    console.log(err);
    throw err;
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

export const searchCrypto = async function (query) {
  try {
    const coin = await getJSON(`${API_BASE_URL}coins/${query}`);
  
    state.activeCoin = {
      id: coin.id,
      symbol: coin.symbol,
      marketCap: coin.market_data.market_cap.usd,
      img: coin.image.large,
      name: coin.name,
      price: coin.market_data.current_price.usd,
      priceChangePerc: coin.market_data.price_change_percentage_24h,
      volume24h: coin.market_data.total_volume.usd,
      rank: coin.market_cap_rank,
      circulatingSupply: coin.market_data.circulating_supply,
      totalSupply: coin.market_data.max_supply,
      ath: coin.market_data.ath.usd,
      fromAthPerc: coin.market_data.ath_change_percentage.usd,
      bookmark: false
    };

  } catch (err) {
    console.log(err);
    throw err;
  }



};

export const addFavorite = function(){
  
  if(!state.activeCoin.bookmark)  state.favorites.push(state.activeCoin);

  if(state.activeCoin.bookmark) {
      const i = state.favorites.findIndex(el => el.id === state.activeCoin.id)
      state.favorites.splice(i,1);
  }


  state.activeCoin.bookmark = !state.activeCoin.bookmark

}
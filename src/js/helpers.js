import { CRYPTOS_OF_INTEREST } from "./config";

export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const filterCryptos = function (array, currency) {
  const myCryptos = array.filter((crypto) =>
    CRYPTOS_OF_INTEREST.some(
      (symbol) =>
        symbol === crypto.symbol.slice(0, 3) &&
        crypto.symbol.slice(-currency.length) === currency &&
        crypto.symbol.length < 8
    )
  );

  return myCryptos;
};

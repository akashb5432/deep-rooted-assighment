const APP_BAS_URL = process.env.REACT_APP_BASE_URL
const URL_UTILITY = {
  getAllTickerUrl: APP_BAS_URL + 'tickers',
  getTickerDetailsUrl: APP_BAS_URL + 'ticker'
};

export default URL_UTILITY;
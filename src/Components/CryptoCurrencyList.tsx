import React from "react";

interface CryptoCurrencyListProps {
  allCryptoCurrency: any[];
  setSelectedCurrency: (currency: any) => void;
  selectedCurrency: any;
}

const CryptoCurrencyList: React.FC<CryptoCurrencyListProps> = (props) => {
  const { allCryptoCurrency, setSelectedCurrency, selectedCurrency } = props;
  //
  const selectCurrencyHandler = (currency: any) => {
    setSelectedCurrency(currency);
  };
  return (
    <div>
      <ul>
        {allCryptoCurrency.length > 0 &&
          allCryptoCurrency.map((ticker: any) => {
            const [
              SYMBOL,
              BID,
              BID_SIZE,
              ASK,
              ASK_SIZE,
              DAILY_CHANGE,
              DAILY_CHANGE_RELATIVE,
              LAST_PRICE,
              VOLUME,
              HIGH,
              LOW,
            ] = ticker;
            const name = `${SYMBOL?.substr(1, 3)} / ${SYMBOL?.substr(4)}T`;
            return (
              <li
                onClick={() => selectCurrencyHandler(ticker)}
                className={`${
                  selectedCurrency?.[0] === SYMBOL ? "active" : ""
                }`}
                key={SYMBOL}
              >
                <div className="line-item-heading">
                  <span className="line-item-head-content">{name}</span>
                  <span className="line-item-head-content">
                    ${LAST_PRICE.toFixed(2)}
                  </span>
                </div>
                <div className="line-item-small-text">
                  <span className="line-item-head-content">Vol: {VOLUME}</span>
                  <span
                    className={`line-item-head-content ${
                      Number(DAILY_CHANGE) < 0 ? "red-text" : "green-text"
                    }`}
                  >
                    {DAILY_CHANGE?.toFixed(2)}%
                  </span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CryptoCurrencyList;

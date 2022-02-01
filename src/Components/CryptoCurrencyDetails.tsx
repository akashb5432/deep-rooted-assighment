import React from "react";

interface CryptoCurrencyProps {
  currencyDetails: any;
}
const CryptoCurrencyDetails: React.FC<CryptoCurrencyProps> = (props) => {
  const { currencyDetails } = props;
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
  ] = currencyDetails;

  const name = `${SYMBOL.substr(1, 3)} / ${SYMBOL.substr(4)}`;
  return (
    <>
      <div className="right-header">
        <h1>{name}</h1>
        <h2>
          <span>${LAST_PRICE?.toFixed(2)}</span>
          <span
            className={`${
              Number(DAILY_CHANGE) < 0 ? "red-text" : "green-text"
            }`}
          >
            {DAILY_CHANGE?.toFixed(2)}%
          </span>
        </h2>
      </div>
      <div className="details-section">
        <table>
          <tr>
            <th>High</th>
            <th>Low</th>
            <th>VOLUME</th>
          </tr>
          <tr>
            <td>${HIGH?.toFixed(2)}</td>
            <td>${LOW?.toFixed(2)}</td>
            <td>{VOLUME}</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default CryptoCurrencyDetails;

import React, { useEffect, useState } from "react";
import httpService from "../../Utility/HttpServices";
import URL_UTILITY from "../../Utility/UrlUtility";
import CryptoCurrencyList from "../CryptoCurrencyList";
import CryptoCurrencyDetails from "../CryptoCurrencyDetails";
import useDebounce from "../../Utility/CustomHooks/UseDebounce";
import "./Landing.css";

const Landing: React.FC<{}> = () => {
  const [allCryptoCurrency, setAllCryptoCurrency] = useState([]);
  const [copyAllCryptoCurrency, setCopyAllCryptoCurrency] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<any>(null);
  const [currencyDetails, setCurrencyDetails] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const debounceLoad = useDebounce(searchText, 500);
  useEffect(() => {
    getAllCryptoCurrency();
    const intervalId = setInterval(() => {
      getAllCryptoCurrency();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getAllCryptoCurrency = () => {
    httpService
      .getApi(URL_UTILITY.getAllTickerUrl, { symbols: "ALL" })
      .then(({ data }) => {
        if (data) {
          setAllCryptoCurrency(data);
          setCopyAllCryptoCurrency(data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (selectedCurrency) {
      getSelectedCurrencyData(selectedCurrency);
    }
  }, [selectedCurrency]);

  const getSelectedCurrencyData = (currency: any) => {
    setLoader(true);
    httpService
      .getApi(`${URL_UTILITY.getTickerDetailsUrl}/${currency[0]}`)
      .then(({ data }) => {
        setLoader(false);
        if (data) {
          setCurrencyDetails([currency[0], ...data]);
        }
      })
      .catch((e) => {
        setLoader(false);
        setCurrencyDetails(null);
        console.error(e);
      });
  };

  useEffect(() => {
    if (debounceLoad) {
      let listBySearch = [...copyAllCryptoCurrency];
      listBySearch = listBySearch.filter((listItem: any) => {
        return listItem[0].toLowerCase().includes(debounceLoad);
      });
      setAllCryptoCurrency(listBySearch);
    } else {
      setAllCryptoCurrency([...copyAllCryptoCurrency]);
    }
  }, [debounceLoad]);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="left-panel">
          <div className="searchBox">
            <input
              type="text"
              className="form-control input-text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <img src="images/ic_search.png" alt="" />
          </div>

          {allCryptoCurrency?.length > 0 ? (
            <CryptoCurrencyList
              allCryptoCurrency={allCryptoCurrency}
              setSelectedCurrency={setSelectedCurrency}
              selectedCurrency={selectedCurrency}
            />
          ) : (
            "Records not found"
          )}
        </div>
        <div className="right-panel">
          {currencyDetails && (
            <CryptoCurrencyDetails currencyDetails={currencyDetails} />
          )}
        </div>
      </div>
      {loader && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Landing;

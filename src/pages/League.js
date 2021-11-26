import React from "react";
import { useParams } from "react-router-dom";
import { Button, Paper, Autocomplete, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";

const AutocompleteTicker = () => {
  const { leagueID } = useParams();
  let history = useHistory();
  const [stockTicker, setStockTicker] = React.useState("");
  const [stockSelected, setStockSelected] = React.useState("");
  const [stockTickerList, setStockTickerList] = React.useState([]);
  const [stockTickerListLoading, setStockTickerListLoading] =
    React.useState(false);
  const [stockTickerListError, setStockTickerListError] = React.useState(false);

  const getTickerFromAPI = async (stockTicker) => {
    setStockTickerListLoading(true);
    setStockTickerListError(false);
    try {
      const response = await fetch(
        `https://ticker-2e1ica8b9.now.sh/keyword/${stockTicker}`
      );
      console.log(response);
      const data = await response.json();
      setStockTickerList(data);
    } catch (error) {
      setStockTickerListError(true);
      console.log(error);
    }
    setStockTickerListLoading(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (event) {
      setStockTicker(event.target.value);
      getTickerFromAPI(stockTicker);
    } else {
      setStockTicker(event);
    }
  };
  const handleSubmit = (event) => {
    //route the user to the stock page
    event.preventDefault();
    if (stockSelected) {
      // pass a prop to the stock page using history
      console.log(stockSelected.symbol);
      history.push({
        pathname: `/league/${leagueID}/trade/${stockSelected.symbol}`,
        state: {
          stock: stockSelected,
        },
      });
    } else {
      alert("Please select a stock");
    }
  };

  return (
    <div>
      <Autocomplete
        id="stock-ticker-demo"
        options={stockTickerList}
        getOptionLabel={(option) => option.symbol + " - " + option.name}
        style={{ width: 300 }}
        onChange={(e, value) => setStockSelected(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Stock Ticker"
            variant="outlined"
            onChange={(event) => handleSearch(event)}
          />
        )}
      />
      {stockTickerListLoading && <p>Loading...</p>}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Search
      </Button>
    </div>
  );
};

function League() {
  const { leagueID } = useParams();
  return (
    <div>
      League page - League ID = {leagueID}
      <AutocompleteTicker />
    </div>
  );
}
export default League;

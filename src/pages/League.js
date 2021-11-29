import React from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Paper, Autocomplete, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import client from "../util/Client";
import { ClassNames } from "@emotion/react";

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

  const HeaderStyle = {
    borderRadius: "25px",
    padding: 0,
    height: "5vh",
    width: 500,
    margin: "30px auto",
    backgroundColor: "#5866d3",
    color: "white",
  };

  let styles = {
    marginRight: '20px'};

    const getMember = [];
    client.post("/leagues/getMembers",{lID: "BtKo6KxS84CqWQiNNEQQ"}).then((res) => {
      console.log(res);
    });
    

  return(
     <div>
       League page - League ID = {leagueID}
         <Grid>
           <Paper style={HeaderStyle}>
             <Grid>
              <h1>Leagues</h1>
             </Grid>
             </Paper>
          <Grid>
            <Paper>
             
              </Paper> 
          </Grid>  
        <Grid padding={10} item md={12}   container direction={'row'}>
          <Paper style={styles}>
            {getMember}
            <h1 style={{ height: "40vh", width:875 }}>Members</h1>
          </Paper>
          <Paper>
            <h1 style={{ height: "40vh", width:850 }}>League</h1>
            <AutocompleteTicker/>
          </Paper>
          </Grid>       
      </Grid>
       </div>
       );
}
export default League;
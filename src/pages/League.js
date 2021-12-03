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

  const AutoComplete = {
    height: "10vh",
    width: 500,
    margin: "0px auto",
  };

  return (
    <div style={AutoComplete}>
      <Autocomplete
        id="stock-ticker-demo"
        options={stockTickerList}
        getOptionLabel={(option) => option.symbol + " - " + option.name}
        style={{ width: 400, margin: "-20px auto", height: "10vh" }}
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
  const [leagueMembers, setLeagueMembers] = React.useState([]);
  const [userCash, setUserCash] = React.useState(0);
  const { leagueID } = useParams();
  React.useEffect(() => {
    async function getLeagueMembers() {
      console.log("getting league members", leagueID);
      const members = await client.get(
        `leagues/getMembers?leagueId=${leagueID}`
      );
      setLeagueMembers(members.data);
      console.log(members.data);
    }
    async function getUserCash() {
      const cash = await client.get(`/leagues/userCash?leagueId=${leagueID}`);
      setUserCash(cash.data.userCash);
    }
    getLeagueMembers();
    getUserCash();
  }, [leagueID]);

  const HeaderStyle = {
    borderRadius: "25px",
    // height: "5vh",
    // padding: 1,
    width: 500,
    margin: "auto",
    backgroundColor: "#5866d3",
    color: "white",
  };

  const backGroundColor = {
    backgroundColor: "#5866d3",
  };

  let styles = {
    marginRight: "20px",
    paddingBottom: 10,
  };

  return (
    <div>
      <div style={HeaderStyle}>
        <h1>Leagues</h1>
        <h3>You have ${userCash}</h3>
      </div>
      <Grid container padding={5}>
        <Grid item xs={6}>
          <Paper style={styles}>
            <Grid>
              <h1>Members</h1>
              {leagueMembers.map((member) => (
                <Paper
                  style={{
                    paddingBottom: "10px",
                    borderRadius: "25px",
                    marginBottom: 40,
                    backgroundColor: "#5866d3",
                    width: "80%",
                    // height: 40,
                    margin: "auto",
                  }}
                >
                  <h3 style={{ paddingTop: 10 }}>{member.userName}</h3>
                  Cash Remaining :{" "}
                  {member.cash.toString().includes(".")
                    ? member.cash.toFixed(2)
                    : member.cash}
                </Paper>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ alignContent: "center" }}>
            <h1 style={{}}>League</h1>
            <AutocompleteTicker />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default League;

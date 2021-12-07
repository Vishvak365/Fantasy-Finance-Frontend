import React from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Paper, Autocomplete, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import client from "../util/Client";

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
    <Grid container padding={1}>
      <Grid item xs={10}>
        <Autocomplete
          id="stock-ticker-demo"
          options={stockTickerList}
          getOptionLabel={(option) => option.symbol + " - " + option.name}
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
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ height: 55 }}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};
function League() {
  let history = useHistory();
  const [leagueMembers, setLeagueMembers] = React.useState([]);
  const [userCash, setUserCash] = React.useState(0);
  const [leagueData, setLeagueData] = React.useState({});
  const [totalStockPortfolio, setTotalStockPortfolio] = React.useState([]);
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
      console.log("getting user cash");
      const cash = await client.get(`/leagues/userCash?leagueId=${leagueID}`);
      console.log(cash);
      setUserCash(cash.data.userCash);
    }
    async function getLeagueData() {
      const league = await client.get(
        `/leagues/leagueInfo?leagueId=${leagueID}`
      );
      console.log("yeet", league.data);
      setLeagueData(league.data);
    }
    async function getUserPortfolio() {
      const portfolio = await client.get(
        `/leagues/portfolioValue/total?leagueId=${leagueID}`
      );
      setTotalStockPortfolio(portfolio.data);
    }
    getLeagueMembers();
    getUserCash();
    getLeagueData();
    getUserPortfolio();
  }, [leagueID]);

  const HeaderStyle = {
    borderRadius: "25px",
    // height: "5vh",
    // marginTop: "15px",
    padding: 1,
    width: 500,
    margin: "auto",
    backgroundColor: "#5866d3",
    color: "white",
  };

  let styles = {
    marginRight: "20px",
    paddingBottom: 10,
  };

  return (
    <div>
      <div style={HeaderStyle}>
        <h1>{leagueData.name}</h1>
        <h3>
          You have $
          {
            //round to 2 decimal places
            parseFloat(userCash).toFixed(2)
          }
        </h3>
        <p>League ID - {leagueID}</p>
      </div>
      <Grid container padding={5}>
        <Grid item xs={6}>
          <Paper style={styles}>
            <Grid>
              <h1>Members</h1>
              {leagueMembers.map((member) => (
                <Paper
                  style={{
                    color: "white",
                    paddingBottom: "10px",
                    borderRadius: "25px",
                    marginBottom: 40,
                    backgroundColor: "#5866d3",
                    width: "80%",
                    cursor: "pointer",
                    // height: 40,
                    margin: "auto",
                  }}
                >
                  <div
                    onClick={() => {
                      history.push(
                        "/league/" + leagueID + "/user/" + member.user_id
                      );
                    }}
                  >
                    <h3 style={{ paddingTop: 10 }}>{member.userName}</h3>
                    Cash Remaining :{" "}
                    {member.cash.toString().includes(".")
                      ? member.cash.toFixed(2)
                      : member.cash}
                  </div>
                </Paper>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            style={{ alignContent: "center", height: "15vh", marginBottom: 10 }}
          >
            <h1>Trade</h1>
            <AutocompleteTicker />
          </Paper>
          {totalStockPortfolio.map((stockPortfolio) => (
            <div
              style={{
                // maxHeight: "1vh",
                // overflow: "auto",
                backgroundColor:
                  stockPortfolio.profit < 0 ? "#ffa7a7" : "#e0ffcd",
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
                cursor: "pointer",
              }}
              onClick={() => {
                console.log(stockPortfolio.stock);
                history.push({
                  pathname: `/league/${leagueID}/trade/${stockPortfolio.stock}`,
                  state: {
                    stock: { symbol: stockPortfolio.stock },
                  },
                });
              }}
            >
              <h3>{stockPortfolio.stock}</h3>
              Quantity : <b>{stockPortfolio.quantity}</b>
              <br />
              Total Value:{" "}
              <b>
                $
                {stockPortfolio.totalValue.toString().includes(".")
                  ? stockPortfolio.totalValue.toFixed(2)
                  : stockPortfolio.totalValue}
              </b>
              <br />
              Average Price:{" "}
              <b>
                $
                {stockPortfolio.averagePrice.toString().includes(".")
                  ? stockPortfolio.averagePrice.toFixed(2)
                  : stockPortfolio.averagePrice}
              </b>
              <br />
              <div>
                <h4>
                  Profit:{" "}
                  <b>
                    $
                    {stockPortfolio.profit.toString().includes(".")
                      ? stockPortfolio.profit.toFixed(2)
                      : stockPortfolio.profit}
                  </b>
                </h4>
              </div>
            </div>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
export default League;

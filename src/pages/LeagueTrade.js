import React from "react";
import { useParams } from "react-router";
import TradingViewWidget, { Themes, BarStyles } from "react-tradingview-widget";
import Grid from "@mui/material/Grid";
import { Button, Paper, Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import client from "../util/Client";

function LeagueTrade(props) {
  const [shareQuantity, setShareQuantity] = useState(1);
  const [errorModal, setErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { leagueID } = useParams();
  const stock = props.history.location.state.stock;

  const buyStock = () => {
    client
      .post(`league/trade/buy_stock`, {
        stockName: stock.symbol,
        quantity: shareQuantity,
        leagueId: leagueID,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setErrorModal(true);
      });
  };

  const sellStock = () => {
    client
      .post(`league/trade/sell_stock`, {
        stockName: stock.symbol,
        quantity: shareQuantity,
        leagueId: leagueID,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setErrorModal(true);
      });
  };

  const tradeStyle = {
    height: "40vh",
  }
  //create a title for the page
  const title = `${stock.symbol} - ${stock.name}`;


  return (
    <div>

      {/* League TRADE - League ID = {leagueID} */}
      <Snackbar open={errorModal} autoHideDuration={6000}>
        <MuiAlert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </MuiAlert>
      </Snackbar>
      <h2>{title}</h2>
      <Grid container spacing={6} style={{ padding: 40, borderRadius: 10 }}>
        <Grid item xs={8} style={{ height: "90vh", paddingTop: 20 }}>
          <TradingViewWidget
            symbol={
              stock.symbol.length >= 4
                ? `NASDAQ:${stock.symbol}`
                : `NYSE:${stock.symbol}`
            }
            theme={Themes.DARK}
            allow_symbol_change={false}
            enable_publishing={false}
            hide_side_toolbar={true}
            hide_top_toolbar={true}
            autosize={true}
            // style={BarStyles.lin}
          />
        </Grid>
        <Grid item xs={4}>
          <Paper style={tradeStyle}>
            <h1 style={{ height: "5vh" }}>Trade</h1>
            <Grid item xs={12}>
              <TextField
                id="outlined-number"
                label="Quantity"
                type="number"
                variant="outlined"
                value={shareQuantity}
                onChange={(e) => setShareQuantity(e.target.value)}
              />
            </Grid>
            <Button
              variant="contained"
              style={{ backgroundColor: "green", marginRight: 20, marginTop: 20 }}
              onClick={buyStock}
            >
              Buy
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "red",  marginTop: 20 }}
              onClick={sellStock}
            >
              Sell
            </Button>
          </Paper>
          {/* <Paper>
            <h1 style={{ height: "40vh" }}>Trade</h1>
          </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default LeagueTrade;
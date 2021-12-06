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
  const [successModal, setSuccessModal] = React.useState(false);
  const { leagueID } = useParams();
  const stock = props.history.location.state.stock;
  // const stock = { symbol: "TSLA" };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const buyStock = () => {
    client
      .post(`leagues/trade/buy_stock`, {
        stockName: stock.symbol,
        quantity: shareQuantity,
        leagueId: leagueID,
        // leagueId: "BtKo6KxS84CqWQiNNEQQ",
      })
      .then((res) => {
        console.log(res);
        // window.location.reload();
        setSuccessModal(true);
        setShareQuantity(1);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setErrorModal(true);
        console.log(err);
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

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorModal(false);
  };
  const handleSuccessClase = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessModal(false);
  };

  const tradeStyle = {
    height: "40vh",
  };

  //create a title for the page
  const title = `${stock.symbol} - ${stock.name}`;

  // autoHideDuration={6000}
  return (
    <div>
      <Snackbar
        open={errorModal}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={handleErrorClose}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successModal}
        autoHideDuration={6000}
        onClose={handleSuccessClase}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={handleSuccessClase}
        >
          {"Successfully bought stock"}
        </Alert>
      </Snackbar>
      <h2>{title}</h2>
      <Grid container spacing={8} style={{ padding: 40, borderRadius: 10 }}>
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
                inputProps={{ min: 1 }}
                onChange={(e) => setShareQuantity(e.target.value)}
              />
            </Grid>
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
                marginRight: 20,
                marginTop: 20,
              }}
              onClick={buyStock}
            >
              Buy
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "red", marginTop: 20 }}
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
// {
//   "stockName": "AAPL",
//   "quantity": 1,
//   "leagueId": "BtKo6KxS84CqWQiNNEQQ"
// }

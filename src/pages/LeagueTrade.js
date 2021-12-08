import React from "react";
import { useParams } from "react-router";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import Grid from "@mui/material/Grid";
import { Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import client from "../util/Client";
import history from ".././history";

function LeagueTrade(props) {
  const [shareQuantity, setShareQuantity] = useState(1);
  const [errorModal, setErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successModal, setSuccessModal] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [stockPortfolio, setStockPortfolio] = React.useState({});
  const [currentPrice, setCurrentPrice] = React.useState(0);
  let { leagueID, stock } = useParams();
  // stock = stock.toUpperCase();
  // let stock = { symbol: stockName.toUpperCase() };
  // const stock = { symbol: "TSLA" };
  React.useEffect(() => {
    async function getStockPortfolioValue() {
      const response = await client.get(
        `/leagues/portfolioValue/stock?leagueId=${leagueID}&stockName=${stock}`
      );
      setStockPortfolio(response.data);
    }
    async function getCurrentStockPrice() {
      const response = await client.get(
        `/stock/currentPrice?stockName=${stock}`
      );
      setCurrentPrice(response.data.price);
    }
    getCurrentStockPrice();
    getStockPortfolioValue();
  }, [leagueID, stock]);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const buyStock = () => {
    client
      .post(`leagues/trade/buy_stock`, {
        stockName: stock,
        quantity: shareQuantity,
        leagueId: leagueID,
        // leagueId: "BtKo6KxS84CqWQiNNEQQ",
      })
      .then((res) => {
        console.log(res);
        // window.location.reload();
        // setSuccessModal(true);
        // setSuccessMessage(`Successfully bought ${shareQuantity} shares of ${stock}`);
        // setShareQuantity(1);
        history.push("/league/" + leagueID);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setErrorModal(true);
        console.log(err);
      });
  };

  const sellStock = () => {
    client
      .post(`leagues/trade/sell_stock`, {
        stockName: stock,
        quantity: shareQuantity,
        leagueId: leagueID,
      })
      .then((res) => {
        console.log(res);
        history.push("/league/" + leagueID);
        // setSuccessModal(true);
        // setSuccessMessage(`Successfully sold ${shareQuantity} shares of ${stock}`);
        // setShareQuantity(1);
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
    marginTop: 10,
    padding: 10,
  };

  //create a title for the page
  const title = `${stock}`;

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
          {successMessage}
        </Alert>
      </Snackbar>
      <h1>{title}</h1>
      <Grid container spacing={8} style={{ padding: 40, borderRadius: 10 }}>
        <Grid item xs={8} style={{ height: "90vh", paddingTop: 20 }}>
          <TradingViewWidget
            symbol={stock.length >= 4 ? `NASDAQ:${stock}` : `NYSE:${stock}`}
            theme={Themes.DARK}
            allow_symbol_change={false}
            enable_publishing={false}
            hide_side_toolbar={true}
            hide_top_toolbar={true}
            autosize={true}
          />
        </Grid>
        <Grid item xs={4}>
          {stockPortfolio.stock ? (
            <div
              style={{
                // maxHeight: "1vh",
                // overflow: "auto",
                backgroundColor:
                  stockPortfolio.profit < 0 ? "#ffa7a7" : "#e0ffcd",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <h3>Your {stock} Portfolio</h3>
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
                  Profit All Time:{" "}
                  <b>
                    $
                    {stockPortfolio.profit.toString().includes(".")
                      ? stockPortfolio.profit.toFixed(2)
                      : stockPortfolio.profit}
                  </b>
                </h4>
              </div>
            </div>
          ) : (
            <br />
          )}
          <Paper style={tradeStyle}>
            <h1>Trade</h1>
            <h3>Current Price: ${currentPrice}</h3>
            <Grid item xs={12}>
              <TextField
                id="outlined-number"
                label="Share Quantity"
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

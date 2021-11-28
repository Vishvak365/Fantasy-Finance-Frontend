import React from "react";
import { useParams } from "react-router";
import TradingViewWidget, { Themes, BarStyles } from "react-tradingview-widget";
import Grid from "@mui/material/Grid";
import { Button, Paper } from "@mui/material";

export default function LeagueTrade() {
  const { leagueID } = useParams();
  return (
    <div>
      League TRADE - League ID = {leagueID}
      <Grid container spacing={2} style={{ padding: 40, borderRadius: 10 }}>
        <Grid item xs={8} style={{ height: "90vh", paddingTop: 20 }}>
          <TradingViewWidget
            symbol="NASDAQ:AAPL"
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
          <Paper>
            <h1 style={{ height: "40vh" }}>Trade</h1>
            <Button variant="contained" style={{ backgroundColor: "green" }}>
              Buy
            </Button>
            <Button variant="contained" style={{ backgroundColor: "red" }}>
              Sell
            </Button>
          </Paper>
          <Paper>
            <h1 style={{ height: "40vh" }}>Trade</h1>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

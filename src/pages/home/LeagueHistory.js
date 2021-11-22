import React from "react";
import { styled, Grid, Paper, Card, Typography } from "@mui/material";
import CardContent from "@material-ui/core/CardContent";
import firebase from "firebase/app";
import client from "../../util/Client";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const LeagueHistoryCard = (props) => {
  //create cards for each stock
  const date = new Date(props.stock.date._seconds * 1000);

  const HistoryCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: props.stock.color,
    color: "white",
  }));

  //   margin: "10px",
  //   backgroundColor: props.stock.color,

  // }
  const card = (
    <HistoryCard>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.stock.leagueName}
        </Typography>
        <h4>
          Stock: {props.stock.stock} Quantity: {props.stock.quantity}
        </h4>
        <h4></h4>
        <h4>
          Action: {props.stock.action} Price: {props.stock.price}
        </h4>
        <h4>
          Executed: {date.toDateString()}, {date.toLocaleTimeString()}
        </h4>
      </CardContent>
    </HistoryCard>
  );
  return card;
};

const LeagueHistory = () => {
  const [history, setHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const getHistory = [];
    const userhistory = client.get("/leagues/getUserHistory");
    try {
      userhistory.then((res) => {
        res.data.forEach((stock) => {
          console.log(stock);
          getHistory.push(stock);
        });
        setHistory(getHistory);
        setLoading(false);
      });
    } catch (error) {
      setError(error);
    }
  }, []);

  return (
    <Grid container justify="center" direction="column">
      <Paper>
        <h3>League History</h3>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error.message}</div>
        ) : history.length > 0 ? (
          <Grid item style={{ maxHeight: 500, overflow: "auto" }}>
            {history.map((stock) => (
              <LeagueHistoryCard stock={stock} />
            ))}
          </Grid>
        ) : (
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              No History
            </Typography>
          </CardContent>
        )}
      </Paper>
    </Grid>
  );
};

export default LeagueHistory;

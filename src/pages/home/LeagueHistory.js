import React from "react";
import {
  styled,
  Paper,
  DialogActions,
  Card,
  Typography,
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import firebase from "firebase/app";
import client from "../../util/Client";
import CardContent from "@material-ui/core/CardContent";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));
const scroolStyle = {
  maxHeight: "75vh",
  overflow: "auto",
};

const LeagueHistoryCard = (props) => {
  //create cards for each stock
  const date = new Date(props.stock.date._seconds * 1000);

  const HistoryCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: "#5866d3",
    color: "white",
  }));

  const card = (
    <HistoryCard>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.stock.leagueName}
        </Typography>
        <h4>
          Stock: {props.stock.stock} Quantity: {props.stock.quantity}
        </h4>
        <h4>
          <p>Action: {props.stock.action.toUpperCase()} </p> Price: $
          {props.stock.price}
        </h4>
        <h4>
          Executed: {date.toDateString()}, {date.toLocaleTimeString()}
        </h4>
      </CardContent>
    </HistoryCard>
  );
  return card;
};
const LeagueHistoryPop = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        color={props.stock.action === "buy" ? "primary" : "warning"}
        onClick={handleClickOpen}
      >
        {props.stock.stockName} {props.stock.action} {props.stock.leagueName}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">History</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <Item>League: {props.stock.leagueName}</Item>
              <Item>Stock: {props.stock.stockName}</Item>
              <Item>Quantity: {props.stock.quantity}</Item>
              <Item>Price: {props.stock.price}</Item>
              <Item>Action: {props.stock.action}</Item>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
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
  }, [loading]);

  return (
    <Paper>
      <h3>League History</h3>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : history.length > 0 ? (
        <div style={scroolStyle}>
          {history.map((stock) => (
            <LeagueHistoryCard stock={stock} />
          ))}
        </div>
      ) : (
        <div>No history</div>
      )}
    </Paper>
  );
};

export default LeagueHistory;

import React from "react";
import {
  styled,
  Grid,
  Box,
  Paper,
  DialogActions,
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import firebase from "firebase/app";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

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
    const db = firebase.firestore();
    const history = db.collection("users").
    doc(firebase.auth().
    currentUser.uid).collection("history").onSnapshot((querySnapshot) => {
      if(!querySnapshot.exists){
      querySnapshot.forEach((doc) => {  
        getHistory.push({
          ...doc.data(),
          key: doc.id,
        });
        console.log(doc.data());
      });
      setHistory(getHistory);
      setLoading(false);
    }
    else{
      console.log("no data");
    }
    });
    return () => history();
  }, [loading]);

  // if(loading) {
  //   return <div>Loading...</div>;

  // }
  
  return (
      <Paper>
      <h3>League History</h3>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
      history.length > 0 ? (
        history.map((stock) => (
          <LeagueHistoryPop stock={stock} />
        ))
        ) : (
          <div>No history</div>
        )
      )}
      </Paper>
  );
};

export default LeagueHistory;

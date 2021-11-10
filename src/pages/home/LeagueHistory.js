import React from "react";
import {
  styled,
  Grid,
  Paper,
  Card,
  DialogActions,
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
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
  const date = new Date(props.stock.executed._seconds * 1000);
  const card = (
    <Card style={{ margin: "10px", backgroundColor: "yellow" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.stock.leagueName}
        </Typography>
        <h4>
          Stock: {props.stock.stockName} Quantity: {props.stock.quantity}
        </h4>
        <h4></h4>
        <h4>
          Action: {props.stock.action} Price: {props.stock.price}
        </h4>
        <h4>
          Executed: {date.toDateString()}, {date.toLocaleTimeString()}
        </h4>
      </CardContent>
    </Card>
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
          <div>No history</div>
        )}
      </Paper>
    </Grid>
  );
};

export default LeagueHistory;

// const LeagueHistoryPop = (props) => {
//   const [open, setOpen] = React.useState(false);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   // create a card for each stock

//   return (
//     <div>
//       <Button
//         variant="contained"
//         color={props.stock.action === "buy" ? "primary" : "warning"}
//         onClick={handleClickOpen}
//       >
//         {props.stock.stockName} {props.stock.action} {props.stock.leagueName}
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="form-dialog-title">History</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             <div>
//               <Item>League: {props.stock.leagueName}</Item>
//               <Item>Stock: {props.stock.stockName}</Item>
//               <Item>Quantity: {props.stock.quantity}</Item>
//               <Item>Price: {props.stock.price}</Item>
//               <Item>Action: {props.stock.action}</Item>
//             </div>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

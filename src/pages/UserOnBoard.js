import React from "react";
import { useHistory } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import {
  Avatar,
  Grid,
  Paper,
  Button,
  Typography,
  Container,
  ThemeProvider,
} from "@material-ui/core";
import { ClassNames } from "@emotion/react";

function UserOnBoard(props) {
  let history = useHistory();

  const HeaderStyle = {
    borderRadius: "25px",
    padding: 0,
    height: "8vh",
    width: 500,
    margin: "30px auto",
    backgroundColor: "#3f51b5",
    color: "white",
  };

  const AboutStyle = {
    borderRadius: "25px",
    padding: 10,
    height: "35vh",
    width: 700,
    margin: "75px auto",
    backgroundColor: "#3f51b5",
    color: "white",
  };

  const PremiumStyle = {
    borderRadius: "25px",
    padding: 10,
    height: "4vh",
    width: 100,
    margin: "25px auto",
  };



  return (
    <div>
      <Grid>
        <Paper elevation={10} style={HeaderStyle}>
          <h1>Welcome to Fantasy Finance</h1>
          <Grid align="center"></Grid>
          </Paper>
          <Paper elevation={10} style={AboutStyle}>
          <p>Fantasy Finance allows your to join fantasy league where you can buy and sell  stocks</p>
          <form
          action={`https://fantasy-finance-backend.herokuapp.com/checkout?token=${props.token}`}
          method="POST"
          >
          <p>You are can join the preimum account for $12</p>
          <Paper elevation={10} style={PremiumStyle}>
          <button type="submit" role="link">
            Join Premium
          </button>
          </Paper>
          </form>
          <Paper elevation={10} style={PremiumStyle}>
          <button onClick={() => history.push("/")}>Start</button>
          </Paper>
        </Paper>
      </Grid>
      
      
      
      
      
      <h1>Welcome to Fantasy Finance</h1>
      <body>
        <p>Fantasy Finance allows your to join fantasy league where you can buy and sell  stocks</p>
        <form
          action={`https://fantasy-finance-backend.herokuapp.com/checkout?token=${props.token}`}
          method="POST"
        >
          You are can join the preimum account for $12
          <button type="submit" role="link">
            Join Premium
          </button>
        </form>
        <button onClick={() => history.push("/")}>Start</button>
      </body>
    </div>
  );
}
export default UserOnBoard;

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
import logo from "../images/FF_Logo.png";

function UserOnBoard(props) {
  let history = useHistory();

  const ImgStyle = {
    borderRadius: "25px",
    padding: 0,
    height: "5vh",
    width: 500,
    margin: "100px auto",
    backgroundColor: "#3f51b5",
    color: "white",
  };


  const HeaderStyle = {
    borderRadius: "25px",
    padding: 0,
    height: "5vh",
    width: 600,
    margin: "150px auto",
    //backgroundColor: "#3f51b5",
    //color: "white",
  };

  
  const AboutStyle = {
    borderRadius: "25px",
    padding: 20,
    height: "40vh",
    width: 800,
    margin: "60px auto",
    backgroundColor: "#3f51b5",
    color: "white",
  };

  const PremiumStyle = {
    borderRadius: "25px",
    padding:10,
    height: "3.5vh",
    width: 175,
    margin: "25px auto",
  };



  return (
    <div>
      <Grid>
        <Grid item>
      <img
          alt="logo"
          style={{
          width: "25%",
          marginTop: "5%",
          textAlign: "center",
          }}
          src={logo}
          />
          </Grid>
          <Paper elevation={10} style={AboutStyle}>
          <h1>Welcome to Fantasy Finance</h1>
          <Grid align="center"></Grid>
          <p>Fantasy Finance is a competitive paper trading application. Fantasy Finance allows you to join fantasy leagues where you can compete against your friends or other users by buying and selling stocks. This platform utilizes real financial market data to allow you to build your paper portfolio and compete inorder to create the best return on investment.</p>
          <Paper elevation={10} style={PremiumStyle}>
          <Button onClick={() => history.push("/")}>Start</Button>
          </Paper>
          <form
          action={`https://fantasy-finance-backend.herokuapp.com/checkout?token=${props.token}`}
          method="POST"
          >
          <p>You can join the preimum account for $12</p>
          <Paper elevation={10} style={PremiumStyle}>
          <Button type="submit" role="link">
            Join Premium
          </Button>
          </Paper>
          </form>
        </Paper>
        {/* <Paper variant="outlined">
          <img src="https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?cs=srgb&dl=pexels-pixabay-210607.jpg&fm=jpg"/>
        </Paper> */}
      </Grid>
    </div>
  );
}
export default UserOnBoard;


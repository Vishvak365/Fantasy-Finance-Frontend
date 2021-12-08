import React from "react";
import "firebase/auth";
import { Button, Grid, Paper, Autocomplete, TextField } from "@mui/material";
export default function Premium(props) {
  const HeaderStyle = {
    borderRadius: "25px",
    width: 500,
    margin: "auto",
    backgroundColor: "#5866d3",
    color: "white",
  };

  const AboutStyle = {
    borderRadius: "25px",
    padding: 10,
    height: "25vh",
    width: 800,
    margin: "60px auto",
    backgroundColor: "#3f51b5",
    color: "white",
  };

  const PremiumStyle = {
    borderRadius: "35px",
    padding: 10,
    width: 175,
    margin: "35px auto",
  };

  return (
    <div>
      <Grid>
        <Paper style={HeaderStyle}>
          <h1>Premium</h1>
        </Paper>
        <Paper elevation={10} style={AboutStyle}>
          <h2>
            Join Premium to get access to all of the features of the app. This
            includes joining and creating more than 3 leagues.
          </h2>
          <br />
          <h3>Join for a low, one time price of $12.00</h3>
          <form
            action={`https://fantasy-finance-backend.herokuapp.com/checkout?token=${props.token}`}
            // action={`http://localhost:8080/checkout?token=${props.token}`}
            method="POST"
          >
            <Paper elevation={12} style={PremiumStyle}>
              <Button type="submit" role="link">
                Purchase Premium
              </Button>
            </Paper>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

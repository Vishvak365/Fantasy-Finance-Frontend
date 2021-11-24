import React from "react";
import { useParams } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import TradingViewWidget, { Themes, BarStyles } from "react-tradingview-widget";
import blue from '@mui/material/colors/blue';
import client from "../util/Client";
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

function League() {
  const { leagueID } = useParams();

  // const MemberStyle = {
  //   borderRadius: "25px",
  //   textTransform: "none",
  //   marginTop: 70,
  //   display: "flex",
  //   alignItems: "center",
  //   boxShadow: 3,
  //   backgroundColor: "#3f51b5",
  //   color: "white",
  //   transition: "background-color 0.5s",
  //   "&:hover": {
  //     backgroundColor: "#42a5f5",
  //     transition: "background-color 0.5s",
  //     cursor: "pointer",
  //   },
  // };

  const HeaderStyle = {
    borderRadius: "25px",
    padding: 0,
    height: "5vh",
    width: 500,
    margin: "30px auto",
    backgroundColor: "#5866d3",
    color: "white",
  };

  let styles = {
    marginRight: '20px'};

    const getMember = [];
    client.post("/leagues/getMembers",{lID: "BtKo6KxS84CqWQiNNEQQ"}).then((res) => {
      console.log(res);
    });
    

  return(
     <div>
       League page - League ID = {leagueID}
         <Grid>
           <Paper style={HeaderStyle}>
             <Grid>
              <h1>Leagues</h1>
             </Grid>
             </Paper>
          <Grid>
            <Paper>
             
              </Paper> 
          </Grid>  
        <Grid padding={10} item md={12}   container direction={'row'}>
          <Paper style={styles}>
            {getMember}
            <h1 style={{ height: "40vh", width:875 }}>Members</h1>
            <Button variant="contained" style={{ backgroundColor: "green" }}>
              Buy
            </Button>
            <Button variant="contained" style={{ backgroundColor: "red" }}>
              Sell
            </Button>
          </Paper>
          <Paper>
            <h1 style={{ height: "40vh", width:850 }}>League</h1>
          </Paper>
          </Grid>       
      </Grid>
       </div>
       );
}

export default League;

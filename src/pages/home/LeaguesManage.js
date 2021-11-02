import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import history from "../../history";

const exampleLeagues = [
  {
    leagueName: "XYZ league",
    leagueId: "k2ljk234234jifh32k4",
  },
  {
    leagueName: "ABC league",
    leagueId: "k2ljk234234jifh32k4",
  },
  {
    leagueName: "EFG league",
    leagueId: "k2ljk234234jifh32k4",
  },
];
function LeagueInfo(props) {
  return (
    <div
      onClick={() => {
        history.push(`/league/${props.league.leagueId}`);
      }}
      style={{
        background: "lightblue",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        cursor: "pointer",
      }}
    >
      {props.league.leagueName}
    </div>
  );
}
export default function LeaguesManage(props) {
  return (
    <Paper>
      <h3>Leagues</h3>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 3fr)",
          marginRight: 3,
          marginLeft: 3,
        }}
      >
        <Button variant="contained" style={{ marginRight: 10 }}>
          Join
        </Button>
        <Button color="success" variant="contained">
          Create
        </Button>
      </Box>
      {exampleLeagues.map((data) => {
        return <LeagueInfo league={data} />;
      })}
    </Paper>
  );
}

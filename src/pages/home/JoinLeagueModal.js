import React from "react";
import client from "../../util/Client";
import { Button, Paper, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//setup react component return function
export default function JoinLeagueModal(props) {
  function sendJoinLeagueRequest(leagueID) {
    client
      .post("/leagues/addUser", { leagueID: leagueID })
      .then((res) => {
        //refresh page
        window.location.reload();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setErrorModal(true);
      });
  }
  const [errorModal, setErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [leagueName, setLeagueName] = React.useState("");
  return (
    <div>
      <Snackbar open={errorModal} autoHideDuration={6000}>
        <MuiAlert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </MuiAlert>
      </Snackbar>
      <Paper
        style={{
          position: "absolute",
          borderRadius: 30,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          margin: 5,
          padding: 10,
          textAlign: "center",
        }}
      >
        <h2>Join League</h2>
        <TextField
          id="outlined-required"
          label="LeagueID"
          type="search"
          onChange={(data) => {
            setLeagueName(data.target.value);
          }}
        />
        <br />
        <Button
          variant="contained"
          style={{ padding: 10, margin: 10, backgroundColor: "#37dd40" }}
          onClick={() => {
            sendJoinLeagueRequest(leagueName);
          }}
        >
          Join
        </Button>
      </Paper>
    </div>
  );
}

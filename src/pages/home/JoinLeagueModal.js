import { Button, Paper, TextField } from "@mui/material";

//setup react component return function
export default function JoinLeagueModal(props) {
  return (
    <div>
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
        <TextField id="outlined-required" label="LeagueID" type="search" />
        <br />
        <Button
          variant="contained"
          style={{ padding: 10, margin: 10, backgroundColor: "#37dd40" }}
        >
          Join
        </Button>
      </Paper>
    </div>
  );
}

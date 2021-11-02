import { Paper } from "@mui/material";

//setup react component return function
export default function CreateLeagueModal(props) {
  return (
    <div>
      <Paper
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center"
        }}
      >
        <h2>Create League</h2>
      </Paper>
    </div>
  );
}

import { Paper } from "@mui/material";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
//setup react component return function
export default function CreateLeagueModal(props) {
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
        <h2>Create League</h2>
        Starting Capital:
        <Slider />
      </Paper>
    </div>
    //insert mui button here
  );
}

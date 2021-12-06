import { Paper, Grid, Button, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import client from "../../util/Client";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import firebase from "firebase";
//import state from react
import { useState } from "react";

//setup react component return function
export default function CreateLeagueModal(props) {
  const [leagueName, setLeagueName] = useState("");
  const [marketHours, setMarketHours] = useState(false);
  const [dayTrading, setDayTrading] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [startingCapital, setStartingCapital] = useState(10000);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleStartingCapitalChange = (event, value) => {
    setStartingCapital(value);
  };

  const handleMarketHours = () => {
    setMarketHours(!marketHours);
  };

  const handleDayTrading = () => {
    setDayTrading(!dayTrading);
  };

  const handleEndDate = (event, date) => {
    setEndDate(event.target.value);
    const endDateFormated = new Date(endDate);
  };

  const handleSubmit = (event) => {
    const endDateFormated = new Date(endDate);
    const endDateTimestamp =
      firebase.firestore.Timestamp.fromDate(endDateFormated).toDate();
    console.log(endDateTimestamp);

    const league = {
      name: leagueName,
      marketHoursOnly: marketHours,
      dayTrading: dayTrading,
      draftMode: {
        daftEnd: endDateTimestamp,
      },
      startingCapital: startingCapital,
    };
    console.log(league);

    event.preventDefault();
    if (leagueName === "" || endDate === null || startingCapital === 0) {
      alert("Please fill out all fields");
    } else {
      client
        .post("/leagues/create", league)
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          setErrorModal(true);
          setErrorMessage(error.response.data.message);
          console.log(error);
        });
    }
  };

  const marks = [
    {
      value: 1000,
      label: "$1k",
    },
    {
      value: 5000,
      label: "$5k",
    },
    {
      value: 10000,
      label: "$10k",
    },
    {
      value: 50000,
      label: "$50k",
    },
  ];

  return (
    <Grid container spacing={3}>
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
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          margin: 5,
          padding: 10,
          height: "50%",
          width: "25%",
          textAlign: "center",
        }}
      >
        <h2>Create League</h2>
        <Grid item xs={12}>
          <Typography variant="h6">
            {" "}
            League Name:{" "}
            <MuiInput
              id="leagueName"
              label="League Name"
              value={leagueName}
              onChange={(event) => setLeagueName(event.target.value)}
            />
          </Typography>
        </Grid>
        <br />
        <Grid item xs={12} style={{ width: 250, margin: (60, "Auto") }}>
          <Typography variant="h6">
            {" "}
            Starting Capital: ${startingCapital}
            {/* <TextField
              id="startingCapital"
              label="Starting Capital"
              type="number"
              value={startingCapital}
              inputProps={{ min: 1000, max: 1000000 }}
              onChange={handleStartingCapitalChange}
            /> */}
          </Typography>{" "}
          <Slider
            aria-label="Always visible"
            defaultValue={100}
            getAriaValueText={(value) => `${value}`}
            onChange={handleStartingCapitalChange}
            step={100}
            marks={marks}
            min={1000}
            max={10000}
          />
        </Grid>
        <Typography variant="h6">
          Market Hours:{" "}
          <input
            type="checkbox"
            checked={marketHours}
            onChange={handleMarketHours}
            value={marketHours}
            color="primary"
          />{" "}
        </Typography>
        <br />
        <Typography variant="h6">
          Day Trading:{" "}
          <input
            type="checkbox"
            checked={dayTrading}
            onChange={handleDayTrading}
            value="dayTrading"
            color="primary"
          />{" "}
        </Typography>
        <br />
        <Typography variant="h6">
          End Date:{" "}
          <MuiInput
            label="End Date"
            type="date"
            value={endDate}
            onChange={handleEndDate}
          />
        </Typography>
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 10 }}
          onClick={handleSubmit}
        >
          {" "}
          Submit
        </Button>
      </Paper>
    </Grid>
  );
}

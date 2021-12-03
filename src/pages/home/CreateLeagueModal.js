import { Paper, Grid } from "@mui/material";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

//import state from react
import { useState } from "react";

//setup react component return function
export default function CreateLeagueModal(props) {
  const [marketHours, setMarketHours] = useState(false);
  const [dayTrading, setDayTrading] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [startingCapital, setStartingCapital] = useState(100);

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
    setEndDate(date);
  };
  const marks = [
    {
      value: 1000,
      label: "$1k",
    },
    {
      value: 2500,
      label: "$2.5k",
    },
    {
      value: 5000,
      label: "$5k",
    },
    {
      value: 10000,
      label: "$10k",
    },
  ];

  return (
    <div>
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
          height: "70%",
          width: "75%",
          textAlign: "center",
        }}
      >
        <h2>Create League</h2>
        {/*  {startingCapital} */}
        {/* <Grid style={{ width: 500, margin: 60 }}>
         */}
         <div style={{ width: 500, margin: 60 }}>
          <Typography variant="h6"> Starting Capital: </Typography>{" "}
          {startingCapital}
          <Slider
            aria-label="Always visible"
            defaultValue={100}
            getAriaValueText={(value) => `${value}`}
            onChange={handleStartingCapitalChange}
            // valueLabelDisplay="on"
            step={100}
            marks={marks}
            min={1000}
            max={10000}
          />
        </div>{" "}
    
        {/* <Typography variant="h6"> Starting Capital: </Typography>{" "}
        {startingCapital}
        <Slider
          aria-label="Always visible"
          defaultValue={100}
          getAriaValueText={(value) => `${value}`}
          onChange={handleStartingCapitalChange}
          // valueLabelDisplay="on"
          step={100}
          marks={marks}
          min={1000}
          max={10000}
        /> */}
        <Typography variant="h6"> League Settings: </Typography>
        <br />
        <Typography variant="h7"> Market Hours: </Typography>
        <Checkbox
          checked={marketHours}
          onChange={handleMarketHours}
          value="marketHours"
          color="primary"
        />
        <Typography variant="h7"> Day Trading: </Typography>
        <Checkbox
          checked={dayTrading}
          onChange={handleDayTrading}
          value="dayTrading"
          color="primary"
        />
        <br />
        <Typography variant="h7"> End Date: </Typography>
        <MuiInput
          label="End Date"
          type="date"
          value={endDate}
          onChange={handleEndDate}
        />
      </Paper>
    </div>
    //insert mui button here
  );
}

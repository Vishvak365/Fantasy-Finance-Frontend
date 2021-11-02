import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
// import client from "../util/Client";
import LeaguesManage from "./home/LeaguesManage";
import Box from "@mui/material/Box";
import LeagueHistory from "./home/LeagueHistory";
export default function Home(props) {
  // const [history, setHistory] = React.useState([]);
  // const [sampleTest, setSampleTest] = React.useState("");

  // React.useEffect(() => {
  //   console.log(props);
  //   async function fetchData() {
  //     const data = await client.get("/trade/history");
  //     setHistory(data.data);
  //     const sampleData = await client.get("/sample/test");
  //     setSampleTest(sampleData.data);
  //   }
  //   fetchData();
  // }, []);

  const paperStyle = {
    padding: 10,
    width: "80%",
    margin: "auto",
    marginBottom: 10,
  };
  return (
    <div>
      <form
        action={`https://fantasy-finance-backend.herokuapp.com/checkout?token=${props.token}`}
        method="POST"
      >
        <button type="submit" role="link">
          Purchase Premium
        </button>
      </form>
      <button
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        Sign Out
      </button>
      <br/>
      <img src={firebase.auth().currentUser.photoURL} alt="User Profile" />
      <h1>{firebase.auth().currentUser.displayName}</h1>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 2fr)",
            p: 5,
            gap: 4,
          }}
        >
          <LeagueHistory />
          <LeaguesManage />
        </Box>
      </div>
    </div>
  );
}

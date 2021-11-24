import React from "react";
import "./util/Firebase";
import "./App.css";
import Login from "./pages/Login";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./pages/Home";
import UserOnBoard from "./pages/UserOnBoard";
import League from "./pages/League";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import LeagueTrade from "./pages/LeagueTrade";

import Grid from "@mui/material/Grid";
function App() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [token, setToken] = React.useState();
  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else if (user) {
    user.getIdToken().then((token) => {
      setToken(token);
      //This print statement is to make it easier to see the token
      console.log("USER API TOKEN", token);
    });
    if (token)
      return (
        <div className="App">
          <Router history={history}>
            <Grid container>
              <Grid item xs={2}>
                <div
                  style={{
                    // backgroundColor: "#5866d3",
                    height: "100vh",
                    boxShadow: "24px 7px 46px -25px rgba(0,0,0,0.13)",
                  }}
                >
                  <img
                    alt="logo"
                    style={{
                      width: "100%",
                      marginTop: "10%",
                      textAlign: "center",
                    }}
                    src="https://travelwithgrant.boardingarea.com/wp-content/uploads/2017/04/robinhood-logo-green-800x150-610x114.png"
                  />
                  <div style={{ backgroundColor: "blue", height: 50 }}>
                    adsf
                  </div>
                </div>
              </Grid>
              <Grid item xs={10}>
                <div
                  style={{
                    backgroundColor: "#5866d3",
                    // textAlign: "right",
                    alignItems: "center",
                    height: 50,
                    display: "flex",
                  }}
                >
                  <img
                    style={{ height: "70%", marginLeft: "72%" }}
                    src={firebase.auth().currentUser.photoURL}
                    alt="User Profile"
                  />
                  <div style={{ color: "white", marginLeft: 10 }}>
                    Hey <b>{firebase.auth().currentUser.displayName}</b>
                  </div>
                </div>
                <Switch>
                  <Route exact path="/">
                    <Home token={token} />
                  </Route>
                  <Route exact path="/onboard" component={UserOnBoard} />
                  <Route exact path="/league/:leagueID" component={League} />
                  <Route
                    exact
                    path="/league/:leagueID/trade/:stock"
                    component={LeagueTrade}
                  />
                </Switch>
              </Grid>
            </Grid>
          </Router>
        </div>
      );
    else return <div></div>;
  } else if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default App;

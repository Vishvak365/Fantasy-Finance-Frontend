import React from "react";
import "./util/Firebase";
import "./App.css";
import Login from "./pages/Login";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./pages/Home";
import About from "./pages/About";
import Premium from "./pages/Premium";
import UserOnBoard from "./pages/UserOnBoard";
import League from "./pages/League";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import LeagueTrade from "./pages/LeagueTrade";
import Sidebar from "./pages/Sidebar";
import Grid from "@mui/material/Grid";
import LeagueUser from "./pages/LeagueUser";
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
                <Sidebar token={token} />
              </Grid>
              <Grid item xs={10}>
                <div
                  style={{
                    backgroundColor: "#5866d3",
                    alignItems: "center",
                    height: 50,
                    marginBottom: 10,
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
                  <Route exact path="/about" component={About} />
                  <Route exact path="/premium">
                    <Premium token={token} />
                  </Route>
                  <Route
                    exact
                    path="/league/:leagueID/trade/:stock"
                    component={LeagueTrade}
                  />
                  <Route
                    exact
                    path="/league/:leagueID/user/:uid"
                    component={LeagueUser}
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

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
    });
    if (token)
      return (
        <div className="App">
          <Router history={history}>
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

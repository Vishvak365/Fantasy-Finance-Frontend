import React from "react";
import "./util/Firebase";
import "./App.css";
import Login from "./pages/Login";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./pages/Home";

function App() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [token, setToken] = React.useState()
  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else if (user) {
    user.getIdToken().then(token => {
      setToken(token)
    })
    if (token)
      return (
        <div className="App">
          <form action={`https://fantasy-finance-backend.herokuapp.com/checkout?token=${token}`} method="POST">
            <button type="submit" role="link">
              Checkout
            </button>
          </form>
          <Home />
        </div>
      );
    else
      return (<div></div>)
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

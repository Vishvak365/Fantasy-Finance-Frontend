import React from "react";
import googleSignin from "../images/google_signin.png";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import googleLogo from "../images/googleLogo.png";
import {
  Avatar,
  Grid,
  Paper,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import client from "../util/Client";



const Login = (props) => {
  let history = useHistory();

  function googleSignInPopup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((user) => {
        console.log(props.token);
        if (user.additionalUserInfo.isNewUser === true) {
          history.push("/onboard");
          client.post("users/createUser");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const googleStyle = {
    borderRadius: "25px",
    textTransform: "none",
    marginTop: 70,
    display: "flex",
    alignItems: "center",
    boxShadow: 3,
    backgroundColor: "#3f51b5",
    color: "white",
    transition: "background-color 0.5s",
    "&:hover": {
      backgroundColor: "#42a5f5",
      transition: "background-color 0.5s",
      cursor: "pointer",
    },
  };
  const loginStyle = {
    borderRadius: "25px",
    padding: 20,
    height: "40vh",
    width: 380,
    margin: "90px auto",
  };


  return (
    <div>
      <Grid>
        <Paper elevation={10} style={loginStyle}>
          <h1>Fantasy Finance</h1>
          <Grid align="center">
            <h2>Sign in</h2>
            <Button
              className="gsignin"
              onClick={googleSignInPopup}
              variant="contained"
              style={googleStyle}
            >
              <Avatar src={googleLogo} />
              <Typography
                component="p"
                variant="h6"
                flexGrow="1"
                textAlign="center"
              >
                Sign in with Google
              </Typography>
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;

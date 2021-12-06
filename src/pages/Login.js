import React from "react";
import googleSignin from "../images/google_signin.png";
import companyLogo from "../images/LogoFF_purple.png";
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
          client.post("/users/createUser").then(() => {
            history.push("/onboard");
          });
          this.window.location.reload();
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
    backgroundColor: "#5866d3",
    height: "40vh",
    width: 380,
    margin: "90px auto",
  };
  // add background color   backgroundColor: "#3f51b5",

  return (
    // add a button to sign in with google

    <Container maxWidth="sm">
      <Paper style={loginStyle} elevation={10}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <img
              style={{
                width: "200px",
                height: "100px",
                margin: "0 auto",
                marginBottom: "20px",
              }}
              src={companyLogo}
            />
          </Grid>
          <Grid item></Grid>
          <Grid item>
            <Button
              opacity="0.6"
              elevation={10}
              style={googleStyle}
              onClick={googleSignInPopup}
            >
              <Avatar src={googleLogo} />
              <Typography variant="h6" align="center">
                Sign in with Google
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;

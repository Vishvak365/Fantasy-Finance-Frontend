import React from "react";
import googleSignin from "../images/google_signin.png";
import companyLogo from "../images/LogoFF_purple.png";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Particles from "react-tsparticles";
import googleLogo from "../images/googleLogo.png";
import {
  Avatar,
  Grid,
  Paper,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import history from "../history";
import client from "../util/Client";

const Login = (props) => {
  // let history = useHistory();

  function googleSignInPopup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((user) => {
        console.log(props.token);
        if (user.additionalUserInfo.isNewUser === true) {
          client.post("users/createUser");
          history.push("/onboard");
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
  const ParticlesOptions = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,

          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
      },
    },
  };
  const particles = (
    <Particles
      className="particles"
      params={ParticlesOptions}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );

  return (
    <div>
      {particles}

      <Container maxWidth="sm">
        <Paper style={loginStyle} elevation={10}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
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
    </div>
  );
};

export default Login;

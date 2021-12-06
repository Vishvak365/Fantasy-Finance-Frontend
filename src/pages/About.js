import React from "react";
import "firebase/auth";
import { Button, Grid, Paper, Autocomplete, TextField } from "@mui/material";
export default function About() {
  const HeaderStyle = {
    borderRadius: "25px",
    padding: 0,
    height: "7vh",
    width: 500,
    margin: "20px auto",
    backgroundColor: "#5866d3",
    color: "white",
  };

  const AboutStyle = {
    backgroundColor: "#FFFFFF",
    color: "#5866d3",
    margin: "10px auto",
    borderRadius: "25px",
    fontSize: 20,
  };

  return (
    <div>
      <Grid>
        <Paper style={HeaderStyle}>
          <h1>ABOUT</h1>
        </Paper>
        <Grid
          padding={5}
          item
          xs={10}
          alignItems="center"
          justifyContent="center"
        >
          <Paper style={AboutStyle}>
            <p>
              Fantasy Finance is a full stack application that combines ideas
              from Fantasy Football and Stock Trading. Users of the website are
              able to join “leagues” (essentially groups where users can compete
              with other users) and “draft” their stock/shares for the league
              duration. They are able to use the application without putting in
              real capital as the website employs paper trading (users starting
              off with a certain capital and where trades aren’t actually
              executed in reality) as the main mechanism for usage. As the
              league progresses, users can trade stocks like they would on other
              apps such as Robinhood and TD Ameritrade, however, now they can
              compete with others as well. The website also allows any of its
              members to purchase a premium option using real currency
              (currently, the payment processing is set to take users’ Credit
              Card, Apple Pay, Samsung Pay, Google Pay, etc. but not actually
              charge these accounts).
            </p>
            <p>
              The tech stack used by the application is separated into several
              divisions which are Frontend, Backend, Firebase, and Devops. For
              the Frontend, ReactJS is used to serve up Javascript/HTML/CSS to
              the client and is hosted on Firebase Hosting. Firebase
              Authentication is used for user session management with Google
              Federated Login as the source of authentication for a user. On the
              Backend, NodeJS Runtime with Express Web Framework is used as the
              REST API server hosted on Heroku. Firebase Admin is used by NodeJS
              to interface and execute privileged commands with Firebase such as
              verify tokens and retrieve/set/update user information. Stripe is
              also the payments processor being used for the Backend/Frontend.
              Firebase powers a few features of the application such as Firebase
              Firestore, which is the NoSQL Database used to store data in a
              collection/document style database. Firebase Authentication and
              Firebase Firebase Hosting, as mentioned before, power both user
              authentication/authorization and hosting the ReactJS website,
              respectively. The Devops processes in place allow for developers
              on the team to easily write code and employ Continuous Integration
              and Continuous Deployment (CI/CD) practices. As soon as a code
              change gets merged into the main branch on either the
              backend/frontend repo, Github Actions pipelines are triggered
              which perform code quality checks and deploy to either Heroku or
              Firebase for Backend and Frontend respectively.
            </p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

//export default About;

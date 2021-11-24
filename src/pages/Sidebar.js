import React from "react";
import firebase from "firebase/app";
import history from "../history";

import logo from "../images/FF_LOGO.png";
export default function Sidebar(props) {
  const Row = ({ name, link }) => {
    return (
      <div
        onClick={() => {
          history.push("/" + link);
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "#D7D7F4",
          backgroundColor: "#F4F4FC",
          height: 40,
          color: "#5866d3",
        }}
      >
        <b>{name}</b>
      </div>
    );
  };

  return (
    <div
      style={{
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
        src={logo}
      />
      <Row name="Home" link="" />
      <Row name="About" link="about" />
      <form
        action={`https://fantasy-finance-backend.herokuapp.com/checkout?token=${props.token}`}
        // action={`http://localhost:8080/checkout?token=${props.token}`}
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
    </div>
  );
}

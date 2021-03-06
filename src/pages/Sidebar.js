import React from "react";
import firebase from "firebase/app";
import history from "../history";
import { useLocation } from "react-router-dom";

import logo from "../images/FF_Logo.png";
export default function Sidebar(props) {
  const Row = ({ name, link }) => {
    const location = useLocation();
    let isActive = location.pathname === link;
    console.log(location.pathname.split("/")[1]);
    return (
      <div
        onClick={() => {
          history.push(link);
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "#D7D7F4",
          backgroundColor: isActive ? "#D7D7F4" : "#F4F4FC",
          height: 40,
          borderStyle: "solid",
          borderColor: isActive ? "#D7D7F4 #3535C2 #D7D7F4 #D7D7F4" : "#F4F4FC",
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
        onClick={() => {
          history.push("/");
        }}
        style={{
          cursor: "pointer",
          width: "100%",
          marginTop: "10%",
          textAlign: "center",
        }}
        src={logo}
      />
      <Row name="Home" link="/" />
      <Row name="About" link="/about" />
      <Row name="Premium" link="/premium" />
      <div
        onClick={() => {
          firebase.auth().signOut();
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffe2f0",
          height: 40,
          // borderStyle: "solid",
          // borderColor: isActive ? "#D7D7F4 #3535C2 #D7D7F4 #D7D7F4" : "#F4F4FC",
          color: "#5866d3",
        }}
      >
        <b>Sign Out</b>
      </div>
    </div>
  );
}

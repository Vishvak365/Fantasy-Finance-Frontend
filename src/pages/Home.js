import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

export default function Home() {
  return (
    <div>
      <img src={firebase.auth().currentUser.photoURL} alt="user photo" />
      <h1>{firebase.auth().currentUser.displayName}</h1>
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

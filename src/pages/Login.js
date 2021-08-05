import React from "react";
import googleSignin from "../images/google_signin.png";
import firebase from "firebase/app";
import "firebase/auth";
function googleSignInPopup() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .catch((error) => {
      console.log(error);
    });
}
export default function Login() {
  return (
    <div>
      <img
        src={googleSignin}
        style={{ cursor: "pointer" }}
        onClick={() => {
          googleSignInPopup();
        }}
        className="gsignin"
        alt="Google Sign In Button"
      />
    </div>
  );
}

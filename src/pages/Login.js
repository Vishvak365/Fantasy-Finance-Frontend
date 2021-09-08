import React from "react";
import googleSignin from "../images/google_signin.png";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";

const Login = () => {

  let history = useHistory();

  function googleSignInPopup() {
  
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((user) => {
        if (user.additionalUserInfo.isNewUser === true) {
          history.push("/onboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
};

export default Login;

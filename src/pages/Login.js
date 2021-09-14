import React from "react";
import googleSignin from "../images/google_signin.png";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
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
        console.log(props.token)
        if (user.additionalUserInfo.isNewUser === true) {
          history.push("/onboard");
          client.post("users/createUser");
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

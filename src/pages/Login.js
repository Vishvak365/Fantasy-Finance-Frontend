import React from "react";
import googleSignin from "../images/google_signin.png";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useHistory } from "react-router-dom";
import client from "../util/Client";

const Login = (props) => {
  let history = useHistory();
  // ,(req, res) => {
  //   const body = req.body;

  //   try {
  //     users
  //       .doc()
  //       .set({
  //         ...body,
  //         name: user.user.displayName,
  //         Premium: false,
  //         created: firebase.firestore.Timestamp.now(),
  //       })
  //       .then((data) => {
  //         res.status(200);
  //         res.json(data);

  //         return;
  //       });
  //   } catch (exception) {
  //     console.log(exception);
  //     res.status(500);
  //     res.send({ message: "error in creating user" });
  //   }
  // });

  // const addNewUser = (user) => {
  //   client.post("/users/createUser")
  // };

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

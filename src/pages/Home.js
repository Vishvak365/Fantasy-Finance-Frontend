import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import client from "../util/Client";

export default function Home() {
  const [history, setHistory] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      const data = await client.get("/trade/history");
      setHistory(data.data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <img src={firebase.auth().currentUser.photoURL} alt="User Profile" />
      <h1>{firebase.auth().currentUser.displayName}</h1>
      <button
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        Sign Out
      </button>
      <p>{history.toLocaleString()}</p>
    </div>
  );
}

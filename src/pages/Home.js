import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import client from "../util/Client";
var faker = require("faker");
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
      <button
        onClick={() => {
          client.get(
            `/trade/makeTrade?stockName=${faker.finance.currencyCode()}&action=${
              ["BUY", "SELL"][Math.floor(Math.random() * 2)]
            }`
          );
        }}
      >
        Create Random Transaction
      </button>
      <div>
        {history.length !== 0
          ? history.map((row) => {
              return (
                <div>
                  <p>
                    {row.stock} - {row.action} - {row.executed._seconds}
                  </p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

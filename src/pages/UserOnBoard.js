import React from "react";
import { useHistory } from "react-router-dom";

function UserOnBoard(props) {
  let history = useHistory();
  return (
    <div>
      <h1>Welcome to OnlyFinance</h1>
      <body>
        <p>OnlyFinance allows your to join fantasy league where you can buy and sell  stocks</p>
        <form
          action={`https://fantasy-finance-backend.herokuapp.com/checkout?token=${props.token}`}
          method="POST"
        >
          You are can join the preimum account for $12
          <button type="submit" role="link">
            Join Premium
          </button>
        </form>
        <button onClick={() => history.push("/")}>Start</button>
      </body>
    </div>
  );
}
export default UserOnBoard;

import React from "react";
import "firebase/auth";
export default function Premium(props) {
  return (
    <div>
      <h1>Premium</h1>
      <p>This is the premium page.</p>
      <form
        action={`https://fantasy-finance-backend.herokuapp.com/checkout?token=${props.token}`}
        // action={`http://localhost:8080/checkout?token=${props.token}`}
        method="POST"
      >
        <button type="submit" role="link">
          Purchase Premium
        </button>
      </form>
    </div>
  );
}

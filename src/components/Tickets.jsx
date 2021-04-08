import React from "react";
import auth from "../auth/authentication";

export default function Tickets(props) {
  return (
    <button
      className="btn btn-info"
      onClick={() => {
        auth.logout(() => {
          props.history.push("/");
        });
      }}
    >
      Logout
    </button>
  );
}

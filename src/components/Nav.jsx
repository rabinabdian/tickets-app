import React from "react";
import { Link } from "react-router-dom";
import auth from "../auth/authentication";

/*
      <Link classNameNameNameName="navbar-brand text-primary font-weight-bold" to="/">
        Tickets App
      </Link>
*/

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="d-flex justify-content-between w-100">
        <Link className="navbar-brand text-primary font-weight-bold" to="/">
          Tickets App
        </Link>
        <div>
          <button
            className="btn btn-outline-primary"
            onClick={() => localStorage.removeItem("token")}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}

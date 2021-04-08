import React from "react";
import { Link } from "react-router-dom";
import auth from "../auth/authentication";

export default function Nav() {
  return (
    <nav>
      <h3>Logo</h3>

      <ul className="d-flex justify-content-around">
        <Link to="/">
          <li className="p-2">home</li>
        </Link>
        <Link to="/1">
          <li className="p-2">Page1</li>
        </Link>

        <Link to="/2">
          <li className="p-2">Page2</li>
        </Link>

        <Link to="/3">
          <li className="p-2">Page3</li>
        </Link>
      </ul>
    </nav>
  );
}

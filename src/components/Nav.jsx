import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../services/user.service";

export default function Nav() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    setLoading(true);
    logout(dispatch)
      .then(res => {
        console.log(res);
        setResponse(res);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="d-flex justify-content-between w-100">
        <Link className="navbar-brand text-primary font-weight-bold" to="/">
          Tickets App
        </Link>
        <div>
          <button
            className="btn btn-outline-primary round-btn"
            onClick={() => handleLogout()}
            disabled={loading}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}

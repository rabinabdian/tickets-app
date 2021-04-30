import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { logoutUser, selectUser } from "../features/user/userSlice";

// TODO to disable all the buttons on loading or panding
export default function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (!user) history.push("/login");
  }, [user, history]);

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="d-flex justify-content-between w-100">
        <div
          className="navbar-brand text-primary font-weight-bold btn m-0 p-0"
          onClick={() => {
            if (history.location.pathname !== "/") history.push("/");
          }}
        >
          Tickets App
        </div>
        {/* <Link className="navbar-brand text-primary font-weight-bold" to="/">
        </Link> */}
        <div>
          <button
            className="btn btn-outline-primary round-btn"
            onClick={() => handleLogout()}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}

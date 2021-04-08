import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = useSelector(state => state);

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

import React from "react";
import Tickets from "./Tickets";

export default function LandingPage(props) {
  return (
    <>
      <div>Home page</div>
      <div className="container">
        <div className="row justify-content-center">
          <Tickets />
        </div>
      </div>
    </>
  );
}

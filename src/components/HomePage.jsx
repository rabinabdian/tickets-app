import React from "react";
import Tickets from "./Tickets";

export default function LandingPage(props) {
  return (
    <>
      <h3 className="mt-2">Home page</h3>
      <div className="container">
        <div className="row justify-content-center">
          <Tickets />
        </div>
      </div>
    </>
  );
}

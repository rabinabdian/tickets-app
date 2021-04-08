import React from "react";
import auth from "../auth/authentication";
import "./styles/LandingPage.scss";

export default function LandingPage(props) {
  return (
    // <>
    //   <div>Landing Page</div>
    //   <button
    //     className="btn btn-primary"
    //     onClick={() => {
    //       auth.login(() => {
    //         props.history.push("/");
    //       });
    //     }}
    //   >
    //     Login
    //   </button>{" "}
    //   <button
    //     className="btn btn-info"
    //     onClick={() => {
    //       auth.logout(() => {
    //         props.history.push("/");
    //       });
    //     }}
    //   >
    //     Logout
    //   </button>
    // </>
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="border landing-page-container">
        <div>
          <button className="btn btn-primary">Login</button>
        </div>
        <div>
          <button className="btn btn-primary">Sign up</button>
        </div>
      </div>
    </div>
  );
}

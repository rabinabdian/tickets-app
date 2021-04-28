import React, { useEffect, useState } from "react";
import TicketsList from "../features/tickets/TicketsList";

export default function LandingPage() {
  const [user, setUser] = useState();
  const [response, setResponse] = useState();

  // useEffect(() => {
  //   checkUser()
  //     .then(data => setResponse(data))
  //     .catch(err => setResponse(err));
  // }, []);

  useEffect(() => {
    if (response?.status === 200) setUser(response?.data);
    else if (response?.status === 403) {
      localStorage.removeItem("token");
    }
  }, [response]);

  return (
    <>
      <div className="d-flex ml-3 mt-1">
        <h5>
          Hello{" "}
          {user && (
            <span className="text-primary">{`${user?.firstName} ${user?.lastName}`}</span>
          )}
        </h5>
      </div>

      <h3 className="mt-2">Home page</h3>
      <div className="container">
        <div className="row justify-content-center">
          <TicketsList />
        </div>
      </div>
    </>
  );
}

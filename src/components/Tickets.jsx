import React, { useEffect, useState } from "react";
import { getTickets } from "../api";
import Ticket from "./Ticket";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

export default function Tickets(props) {
  const [tickets, setTickets] = useState();
  const [response, setResponse] = useState();
  const [errors, setErrors] = useState("");
  const [lodaing, setLodaing] = useState(false);

  useEffect(() => {
    setLodaing(true);
    getTickets({ token: localStorage.getItem("token") })
      .then(data => setResponse(data))
      .catch(err => setResponse(err));
  }, []);

  useEffect(() => {
    if (response?.status === 200) {
      setTickets(response?.data);
      setLodaing(false);
    } else if (response?.status === 403) {
      setErrors(<Redirect to="/" />);
      localStorage.removeItem("token");
    } else setErrors(response?.data);

    return () => {
      setLodaing(false);
    };
  }, [response]);

  return !errors ? (
    <>
      <div className="col-md-offset-3 m-2">
        <div className="card" style={{ width: "20rem", height: "8rem" }}>
          <div className="card-body d-flex justify-content-center align-items-center">
            <Link
              className="btn btn-link btn-style"
              to={{ pathname: `/ticket/edit/`, pageType: "create" }}
            >
              <i
                className={`fas fa-plus card-text fa-3x text-${
                  lodaing ? "muted" : "primary"
                }`}
              />
            </Link>
          </div>
        </div>
      </div>

      {!lodaing &&
        tickets &&
        tickets.map(ticket => (
          <div key={ticket?.id} className="col-md-offset-3 m-2">
            <Ticket ticket={ticket} id={ticket?.id} title={ticket?.title} />
          </div>
        ))}
    </>
  ) : (
    <div className="alert text-danger p-0 form-error ml-2">{errors}</div>
  );
}

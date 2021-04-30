import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTickets, selectAllTickets } from "./ticketsSlice";

import Ticket from "./Ticket";

export default function TicketsList() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const tickets = useSelector(selectAllTickets);

  const ticketsStatus = useSelector(state => state.tickets.status);

  useEffect(() => {
    (async () => {
      if (ticketsStatus === "idle") {
        const result = await dispatch(fetchTickets());
        if (result.error) {
          setError(result.error.message);
        }
      }
    })();
  }, [ticketsStatus, dispatch]);

  const handleTryFetchAgain = async () => {
    const result = dispatch(fetchTickets());
    if (result.error) {
      setError(result.error.message);
    }
  };

  let loader = (() => {
    if (ticketsStatus === "loading") {
      return <div className="spinner-grow text-primary" role="status" />;
    }
    if (error) {
      return (
        <div>
          <div className="alert text-danger p-0 m-0 h5">{error}</div>
          <button className="btn btn-link" onClick={handleTryFetchAgain}>
            try again
          </button>
        </div>
      );
    }
    return (
      <Link
        className="btn btn-link btn-style"
        to={{ pathname: `/ticket/create` }}
      >
        <i className="fas fa-plus card-text fa-3x text-primary" />
      </Link>
    );
  })();

  return (
    <>
      <div className="col-md-offset-3 m-2">
        <div className="card" style={{ width: "20rem", height: "8rem" }}>
          <div className="card-body d-flex justify-content-center align-items-center">
            {loader}
          </div>
        </div>
      </div>
      {tickets.map(ticket => (
        <div key={ticket.id} className="col-md-offset-3 m-2">
          <Ticket ticket={ticket} title={ticket.title} />
        </div>
      ))}
    </>
  );
}

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTickets, selectAllTickets } from "./ticketsSlice";

import Ticket from "./Ticket";

export default function TicketsList() {
  console.log("TicketsList render");
  const dispatch = useDispatch();

  const tickets = useSelector(selectAllTickets);

  const ticketsStatus = useSelector(state => state.tickets.status);
  const error = useSelector(state => state.tickets.error);

  useEffect(() => {
    if (ticketsStatus === "idle") {
      dispatch(fetchTickets());
    }
  }, [ticketsStatus, dispatch]);

  let content;

  if (ticketsStatus === "loading") {
    content = <div>Loading...</div>; // TODO center a spinner
  } else if (ticketsStatus === "succeeded") {
    content = tickets.map(ticket => (
      <div key={ticket.id} className="col-md-offset-3 m-2">
        <Ticket ticket={ticket} title={ticket.title} />
      </div>
    ));
  } else if (ticketsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <>
      <div className="col-md-offset-3 m-2">
        <div className="card" style={{ width: "20rem", height: "8rem" }}>
          <div className="card-body d-flex justify-content-center align-items-center">
            {ticketsStatus === "loading" ? (
              <div className="spinner-grow text-primary" role="status" />
            ) : (
              <Link
                className="btn btn-link btn-style"
                to={{ pathname: `/ticket/create` }}
              >
                <i className="fas fa-plus card-text fa-3x text-primary" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {content}
    </>
  );
}

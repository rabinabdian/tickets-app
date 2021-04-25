import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles/Ticket.scss";

export default function Ticket({ ticket }) {
  const history = useHistory();
  const handleTicketView = ({ target }) => {
    if (target.getAttribute("name") !== "edit")
      history.push(`/ticket/view/${ticket?.id}`);
  };

  return (
    <div
      className="card card-data"
      style={{
        boxShadow: `2px 2px 4px 0px ${ticket.color}`,
      }}
      onClick={handleTicketView}
    >
      <div className="card-body">
        <h4 className="card-title">{ticket?.title}</h4>
      </div>
      <div className="card-footer bg-transparent border-0">
        <div className="d-flex justify-content-end align-items-end h-100 w-100">
          <div className="card-link text-primary d-flex flex-column">
            <Link
              name="edit"
              to={{
                pathname: `/ticket/edit/${ticket?.id}`,
                ticket: { ...ticket },
              }}
            >
              <i name="edit" className="fas fa-pencil-alt" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

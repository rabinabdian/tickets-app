import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Ticket.scss";

export default function Ticket({ ticket }) {
  return (
    <div
      className="card card-data"
      style={{
        boxShadow: `2px 2px 4px 0px ${ticket.color}`,
      }}
    >
      <div className="card-body">
        <h4 className="card-title">{ticket?.title}</h4>
      </div>
      <div className="card-footer  bg-transparent border-0">
        <div className="d-flex justify-content-end align-items-end h-100 w-100">
          {/* <div className="card-link text-primary d-flex flex-column">
            <i className="fas fa-trash-alt" />
            delete
          </div> */}
          <div className="card-link text-primary d-flex flex-column">
            <Link
              to={{
                pathname: `/ticket/edit/${ticket?.id}`,
                ticket: { ...ticket },
                pageType: "edit",
              }}
            >
              <i className="fas fa-pencil-alt" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

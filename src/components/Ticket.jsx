import React from "react";

export default function Ticket({ title }) {
  return (
    <div className="card" style={{ width: "20rem", height: "8rem" }}>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
      </div>
      <div className="card-footer  bg-transparent border-0">
        <div className="d-flex justify-content-end align-items-end h-100 w-100">
          {/* <div className="card-link text-primary d-flex flex-column">
            <i className="fas fa-trash-alt" />
            delete
          </div> */}
          <div className="card-link text-primary d-flex flex-column">
            <i className="fas fa-pencil-alt" />
          </div>
        </div>
      </div>
    </div>
  );
}

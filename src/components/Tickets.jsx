import React from "react";
import Ticket from "./Ticket";

const lorem = "Lorem ipsum dolo5r sit amet consectetu5r adipisicing elit. Eni5m velit cupiditate, magnam corrupti expedita ass5umenda non, alias praesentium lauda5ntium aliquam nostrum cul5pa. Dolor, nihil quos quia molestiae non ut repud5iandae.Lorem ipsum dolo5r sit amet consectetu5r adipisicing elit. Eni5m velit cupiditate, magnam corrupti expedita ass5umenda non, alias praesentium lauda5ntium aliquam nostrum cul5pa. Dolor, nihil quos quia molestiae non ut repud5iandae.Lorem ipsum dolo5r sit amet consectetu5r adipisicing elit. Eni5m velit cupiditate, magnam corrupti expedita ass5umenda non, alias praesentium lauda5ntium aliquam nostrum cul5pa. Dolor, nihil quos quia molestiae non ut repud5iandae.Lorem ipsum dolo5r sit amet consectetu5r adipisicing elit. Eni5m velit cupiditate, magnam corrupti expedita ass5umenda non, alias praesentium lauda5ntium aliquam nostrum cul5pa. Dolor, nihil quos quia molestiae non ut repud5iandae.Lorem ipsum dolo5r sit amet consectetu5r adipisicing elit. Eni5m velit cupiditate, magnam corrupti expedita ass5umenda non, alias praesentium lauda5ntium aliquam nostrum cul5pa. Dolor, nihil quos quia molestiae non ut repud5iandae.Lorem ipsum dolo5r sit amet consectetu5r adipisicing elit. Eni5m velit cupiditate, magnam corrupti expedita ass5umenda non, alias praesentium lauda5ntium aliquam nostrum cul5pa. Dolor, nihil quos quia molestiae non ut repud5iandae.ntium aliquam nostrum culntium aliquam nostrum cul".split(
  "5"
);

const tickets = lorem.map(a => <Ticket title={a} />);

export default function Tickets() {
  return (
    <>
      <div className="col-md-offset-3 m-2">
        <div className="card" style={{ width: "20rem", height: "8rem" }}>
          <div className="card-body d-flex justify-content-center align-items-center">
            <i className="fas fa-plus card-text fa-3x text-primary"></i>
          </div>
        </div>
      </div>
      {tickets.map((ticket, index) => (
        <div key={index} className="col-md-offset-3 m-2">
          {ticket}
        </div>
      ))}
    </>
  );
}

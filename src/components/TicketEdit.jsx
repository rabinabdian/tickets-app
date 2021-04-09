import React, { useState, useEffect } from "react";
import "./styles/TicketEdit.scss";

export default function TicketEdit({ location: { ticket } }) {
  const [ticketData, setTicketData] = useState(ticket);

  // TODO rest call to fetch that spesific ticket data
  const getTicketData = () => {
    return { title: "this is title" };
  };

  // if edit page got refresh we need to fetch that data again
  useEffect(() => {
    if (!ticketData) setTicketData(getTicketData());
  }, []);

  return (
    <div>
      <h3 className="mt-2">Edit Ticket</h3>
      <div className="d-flex justify-content-center">
        <div className="card ticket-edit-card shadow p-3 border-0">
          <div className="body d-flex flex-column align-items-start justify-content-around ml-2 h-100">
            <div className="card-text h5">Title: {ticketData?.title}</div>
            <div className="card-text h5">Body:</div>
            <div className="card-text h5">Priority:</div>
            <div className="card-text h5">Read Flag:</div>
            <div className="card-text h5">Color:</div>
            <div className="card-text h5">Icon:</div>
          </div>
        </div>
      </div>
    </div>
  );
}

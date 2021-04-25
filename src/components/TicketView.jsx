import React, { useEffect, useState } from "react";
import { getTicket } from "../api";

export default function TicketView({
  location: { ticket, pathname },
  history,
}) {
  const [ticketData, setTicketData] = useState(ticket);
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const path = pathname
    .split("/")
    .filter(c => c)
    .pop();

  useEffect(() => {
    if (!ticketData) {
      setLoading(true);
      getTicket(path).then(data => {
        setResponse(data);
      });
    }
  }, [ticketData]);

  useEffect(() => {
    if (response?.status === 200) {
      setTicketData(response?.data);
      setLoading(false);
    } else if (response?.status === 403) {
      history.push("/");
      localStorage.removeItem("token");
    }

    return () => {
      setLoading(false);
    };
  }, [response]);

  return (
    <div className="h-100 p-3">
      <h3 className="h-100">View Ticket</h3>
      {
        <div className="d-flex justify-content-center">
          <div
            className="card ticket-edit-card p-3"
            style={{ boxShadow: `0px 0px 6px 0px ${ticketData?.color}` }}
          >
            <div className="form-container body d-flex flex-column align-items-start px-2 h-100">
              <div className="d-flex align-items-center mb-5">
                <h5 className="form-label text-left ml-1">Title:</h5>
                <h6 className="ml-3 text-break">{ticketData?.title}</h6>
              </div>
              <div className="d-flex w-100 align-items-center mb-5">
                <h5 className="form-label text-left ml-1">Body: </h5>
                <h6 className="ml-3 text-break">{ticketData?.body}</h6>
              </div>
              <div className="d-flex w-100 align-items-center mb-5">
                <h5 className="form-label text-left ml-1">Priority: </h5>
                <h6 className="ml-3 text-break">{ticketData?.priority}</h6>
              </div>

              <div className="d-flex w-100 align-items-center mb-5">
                <h5 className="form-label text-left ml-1">is read?</h5>
                <h6 className="ml-3 text-break">
                  {ticketData?.isRead ? "yes" : "no"}
                </h6>
              </div>

              <div className="d-flex w-100 align-items-center mb-5">
                <h5 className="form-label text-left ml-1">Color: </h5>
                <h6
                  className="ml-3 text-break"
                  style={{ color: ticketData?.color }}
                >
                  {ticketData?.color}
                </h6>
              </div>

              <div className="d-flex w-100 align-items-center mb-5">
                <h5 className="form-label text-left ml-1">Icon</h5>
                <h6 className="ml-3 text-break">{ticketData?.icon}</h6>
              </div>

              <div className="d-flex justify-content-around w-100">
                <button
                  className="btn btn-outline-primary round-btn control-btn"
                  onClick={() => history.push("/")}
                  type="button"
                >
                  Back
                </button>
                <button
                  className="btn btn-secondary round-btn control-btn"
                  onClick={() => history.push(`/ticket/edit/${ticketData?.id}`)}
                  type="button"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

import React, { useState } from "react";
import { deleteTicket } from "../api";

export default function DeleteModal({ ticketId, history }) {
  const [modalView, setModalView] = useState(false);

  const handleDeleteTicket = async () => {
    await deleteTicket(ticketId);
    setModalView(false);
    history.push("/");
  };

  return (
    <>
      <button
        style={{ width: "50px" }}
        className="btn btn-outline-link control-btn trash"
        type="button"
        onClick={() => setModalView(prevState => !prevState)}
      >
        <i className="fas fa-trash-alt text-danger" />
      </button>
      <div
        className={`modal-backdrop d-${modalView ? "block" : "none"}`}
        tabIndex="-1"
        onClick={event => {
          if (event.target.getAttribute("name")) setModalView(false);
        }}
      >
        <div
          name="modal-backdrop"
          className={`modal ${
            modalView ? "d-block" : "fade"
          } d-flex align-items-center`}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Ticket</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalView(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body h6">
                Are you sure you want to delete this ticket?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary round-btn"
                  onClick={() => setModalView(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger round-btn"
                  onClick={handleDeleteTicket}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "./styles/TicketEdit.scss";
import PriorityPanel from "./editTicketsPanels/PriorityPanel";
import { createTicket, editTicket } from "../api";

const editTicketSchema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string(),
});

export default function TicketEdit({
  location: { ticket, pageType },
  history,
}) {
  const [ticketData, setTicketData] = useState(ticket);
  const [priority, setPriority] = useState(ticket?.priority?.toString());
  const [loading, setLoading] = useState(false);

  const handlePriorityClick = ({ target: { value } }) => {
    setPriority(value);
    return value;
  };

  const getTicketData = () => {
    return {
      title: "this is title",
      body: "this is body",
      priority: "1",
      isRead: true,
      color: "this is color",
      icon: "this is icon",
    };
  };

  // if edit page got refresh we need to fetch that data again
  useEffect(() => {
    // TODO get ticket by id
    if (!ticketData && pageType === "edit") setTicketData(getTicketData());
  }, [ticketData, pageType]);

  const handleSubmit = async values => {
    values.id = ticket?.id;
    setLoading(true);
    if (pageType === "create") await createTicket(values);
    else await editTicket(values);

    setTimeout(() => {
      setLoading(false);
      history.push("/");
    }, 100);
  };

  return (
    <div className="h-100 p-3">
      <h3 className="h-100">Edit Ticket</h3>
      <div className="d-flex justify-content-center">
        <div className="card ticket-edit-card shadow p-3 border-0">
          <Formik
            initialValues={{
              title: ticketData?.title || "",
              body: ticketData?.body || "",
              priority: ticketData?.priority || "",
              isRead: ticketData?.isRead || false,
              color: ticketData?.color || "",
              icon: ticketData?.icon || "",
            }}
            validationSchema={editTicketSchema}
            enableReinitialize={true}
            onSubmit={values => handleSubmit(values)}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form className="form-container body d-flex flex-column align-items-start px-2 h-100">
                <div className="w-100 mb-5">
                  <h5 className="form-label text-left ml-1">Title</h5>
                  <Field
                    name="title"
                    className="form-control"
                    disabled={loading}
                  />
                  {errors.title && touched.title && (
                    <div className="alert text-danger p-0 m-0">
                      {errors.title}
                    </div>
                  )}
                </div>
                <div className="w-100 mb-5">
                  <h5 className="form-label text-left ml-1">Body</h5>
                  <Field
                    name="body"
                    className="form-control"
                    component="textarea"
                    disabled={loading}
                  />
                </div>
                <div className="w-100 mb-5">
                  <h5 className="form-label text-left ml-1">Priority</h5>
                  <PriorityPanel
                    priority={priority}
                    setFieldValue={setFieldValue}
                    handlePriorityClick={handlePriorityClick}
                    disabled={loading}
                  />
                </div>

                <div className="w-100 mb-5 d-flex justify-content-start align-items-center">
                  <h5 className="form-label text-left ml-1">is read?</h5>
                  <Field
                    name="isRead"
                    type="checkbox"
                    className="form-checkbox ml-3"
                    disabled={loading}
                  />
                </div>

                <div className="w-100 mb-5">
                  <h5 className="form-label text-left ml-1">Color</h5>
                  <Field
                    name="color"
                    className="form-control"
                    disabled={loading}
                  />
                </div>

                <div className="w-100 mb-5">
                  <h5 className="form-label text-left ml-1">Icon</h5>
                  <Field
                    name="icon"
                    className="form-control"
                    disabled={loading}
                  />
                </div>

                <div className="d-flex justify-content-around w-100">
                  <button
                    className="btn btn-outline-secondary round-btn control-btn"
                    onClick={() => history.push("/")}
                    type="button"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary round-btn control-btn"
                    type="submit"
                    disabled={loading}
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

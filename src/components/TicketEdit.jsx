import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "./styles/TicketEdit.scss";
import PriorityPanel from "./editTicketsPanels/PriorityPanel";

const editTicketSchema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string(),
});

export default function TicketEdit({ location: { ticket } }) {
  const [ticketData, setTicketData] = useState(ticket);
  const [priority, setPriority] = useState("1");

  const handlePriorityClick = ({ target: { value } }) => {
    setPriority(value);
    return value;
  };

  // TODO rest call to fetch that spesific ticket data
  const getTicketData = () => {
    return {
      title: "this is title",
      body: "this is body",
      priority: "1",
      read: true,
      color: "this is color",
      icon: "this is icon",
    };
  };

  // if edit page got refresh we need to fetch that data again
  useEffect(() => {
    if (!ticketData) setTicketData(getTicketData());
  }, []);

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
              read: ticketData?.read || false,
              color: ticketData?.color || "",
              icon: ticketData?.icon || "",
            }}
            validationSchema={editTicketSchema}
            enableReinitialize={true}
            onSubmit={values => console.log(values)}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form className="form-container body d-flex flex-column align-items-start px-2 h-100">
                <div className="w-100 mb-5">
                  <h5 className="form-label text-left ml-1">Title</h5>
                  <Field name="title" className="form-control" />
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
                  />
                </div>
                <div className="w-100 mb-5">
                  <h5 className="form-label text-left ml-1">Priority</h5>
                  <PriorityPanel
                    priority={priority}
                    setFieldValue={setFieldValue}
                    handlePriorityClick={handlePriorityClick}
                  />
                </div>

                <div className="w-100 mb-5 d-flex justify-content-start align-items-center">
                  <h5 className="form-label text-left ml-1">Read</h5>
                  <Field
                    name="read"
                    type="checkbox"
                    className="form-checkbox ml-3"
                  />
                </div>

                <div className="w-100 mb-5">
                  <h5 className="form-label text-left ml-1">Color</h5>
                  <Field name="color" className="form-control" />
                </div>

                <div className="w-100 mb-5">
                  <h5 className="form-label text-left ml-1">Icon</h5>
                  <Field name="icon" className="form-control" />
                </div>

                <div className="d-flex justify-content-around w-100">
                  <button
                    className="btn btn-outline-secondary round-btn control-btn"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary round-btn control-btn"
                    type="submit"
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

import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "./styles/TicketEdit.scss";

const editTicketSchema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string(),
});

export default function TicketEdit({ location: { ticket } }) {
  const [ticketData, setTicketData] = useState(ticket);

  // TODO rest call to fetch that spesific ticket data
  const getTicketData = () => {
    return {
      title: "this is title",
      body: "this is body",
      priority: 5,
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
    <div>
      <h3 className="mt-2">Edit Ticket</h3>
      <div className="d-flex justify-content-center">
        <div className="card ticket-edit-card shadow p-3 border-0">
          <Formik
            initialValues={{
              title: ticketData?.title || "",
              body: ticketData?.body || "",
              priority: ticketData?.priority || 0,
              read: ticketData?.read || false,
              color: ticketData?.color || "",
              icon: ticketData?.icon || "",
            }}
            validationSchema={editTicketSchema}
            enableReinitialize={true}
            onSubmit={values => console.log(values)}
          >
            {({ errors, touched, values }) => (
              <Form className="form-container body d-flex flex-column align-items-start justify-content-around px-2 h-100">
                <div className="w-100">
                  <h5 className="form-label text-left ml-1">Title</h5>
                  <Field name="title" className="form-control" />
                  {errors.title && touched.title && (
                    <div className="alert text-danger p-0 m-0">
                      {errors.title}
                    </div>
                  )}
                </div>
                <div className="w-100">
                  <h5 className="form-label text-left ml-1">Body</h5>
                  <Field
                    name="body"
                    className="form-control"
                    component="textarea"
                  />
                </div>

                <Field name="priority" className="form-control" />
                <Field name="read" className="form-control" />
                <Field name="color" className="form-control" />
                <Field name="icon" className="form-control" />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

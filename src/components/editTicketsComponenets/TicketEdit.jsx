import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Redirect } from "react-router-dom";
import * as yup from "yup";
import "../styles/TicketEdit.scss";
import PriorityPanel from "./PriorityPanel";
import { createTicket, editTicket, getTicket } from "../../api";
import DeleteModal from "./DeleteModal";
import { TwitterPicker } from "react-color";

const editTicketSchema = yup.object().shape({
  title: yup.string().required().max(60),
  body: yup.string(),
});

export default function TicketEdit({
  location: { ticket, pathname },
  history,
}) {
  const [ticketData, setTicketData] = useState(ticket);
  const [priority, setPriority] = useState(ticket?.priority?.toString());
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const [errors, setErrors] = useState("");
  const [colorPicked, setColorPicked] = useState(ticketData?.color);

  const path = pathname
    .split("/")
    .filter(c => c)
    .pop();

  const handlePriorityClick = ({ target: { value } }) => {
    setPriority(value);
    return value;
  };

  useEffect(() => {
    if (!ticketData && path !== "create") {
      setLoading(true);
      getTicket(path).then(data => {
        setResponse(data);
      });
    }
  }, [ticketData, path]);

  useEffect(() => {
    if (response?.status === 200) {
      setTicketData(response?.data);
      setPriority(response?.data?.priority?.toString());
      setLoading(false);
    } else if (response?.status === 403) {
      setErrors(<Redirect to="/" />);
      localStorage.removeItem("token");
    } else setErrors(response?.data);

    return () => {
      setLoading(false);
    };
  }, [response]);

  const handleSubmit = async values => {
    values.id = ticket?.id;
    setLoading(true);
    if (path === "create") await createTicket(values);
    else await editTicket(values);

    setTimeout(() => {
      setLoading(false);
      history.push("/");
    }, 100);
  };

  return (
    <div className="h-100 p-3">
      <h3 className="h-100">{path === "create" ? "Create" : "Edit"} Ticket</h3>
      {!errors ? (
        <div className="d-flex justify-content-center">
          <div
            className="card ticket-edit-card p-3"
            style={{ boxShadow: `0px 0px 6px 0px ${colorPicked}` }}
          >
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
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <h5 className="form-label text-left ml-1">Title</h5>

                      {path !== "create" && (
                        <DeleteModal
                          ticketId={ticketData?.id}
                          history={history}
                        />
                      )}
                    </div>
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
                    <TwitterPicker
                      onChange={(color, event) => {
                        setFieldValue("color", color?.hex || "black");
                        setColorPicked(color?.hex || "black");
                      }}
                      color={values?.color || "black"}
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
      ) : (
        <div className="alert text-danger p-0 form-error ml-2">{errors}</div>
      )}
    </div>
  );
}

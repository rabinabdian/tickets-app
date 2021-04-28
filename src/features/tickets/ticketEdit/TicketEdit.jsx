import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import { selectTicketById, updateTicket, addNewTicket } from "../ticketsSlice";

import PriorityPanel from "./PriorityPanel";
import DeleteModal from "./DeleteModal";
import { TwitterPicker } from "react-color";
import Picker from "emoji-picker-react";

import "../styles/TicketEdit.scss";

const ticketEditSchema = yup.object().shape({
  title: yup.string().required().max(60),
  body: yup.string(),
});

export default function TicketEdit({ match, history }) {
  const dispatch = useDispatch();
  const { ticketId } = match.params;
  const isEdit = match.url.includes("edit");

  let ticket = useSelector(state => selectTicketById(state, ticketId));
  const ticketsStatus = useSelector(state => state.tickets.status);

  const [priority, setPriority] = useState(ticket?.priority?.toString());
  const [colorPicked, setColorPicked] = useState(ticket?.color);

  const handleSubmit = values => {
    dispatch(
      isEdit
        ? updateTicket({ body: values, ticketId })
        : addNewTicket({ body: values })
    );

    if (ticketsStatus === "succeeded") history.push("/");
  };

  return (
    <div className="h-100 p-3">
      <h3 className="h-100">{isEdit ? "Edit" : "Create"} Ticket</h3>

      <div className="d-flex justify-content-center">
        <div
          className="card ticket-edit-card p-3"
          style={{ boxShadow: `0px 0px 6px 0px ${colorPicked}` }}
        >
          <Formik
            initialValues={{
              title: ticket?.title || "",
              body: ticket?.body || "",
              priority: ticket?.priority || "",
              read: ticket?.read || false,
              color: ticket?.color || "",
              icon: ticket?.icon || "",
            }}
            validationSchema={ticketEditSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form className="form-container body d-flex flex-column align-items-start px-2 h-100">
                <div className="w-100 mb-5">
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <h5 className="form-label text-left ml-1">Title</h5>

                    {isEdit && (
                      <DeleteModal ticketId={ticket?.id} history={history} />
                    )}
                  </div>
                  <Field
                    name="title"
                    className="form-control"
                    disabled={false}
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
                    disabled={false}
                  />
                </div>
                <div className="w-100 mb-5">
                  <h5 className="form-label text-left ml-1">Priority</h5>
                  <PriorityPanel
                    priority={priority}
                    setFieldValue={setFieldValue}
                    handlePriorityClick={({ target: { value } }) => {
                      setPriority(value);
                      return value;
                    }}
                    disabled={false}
                  />
                </div>

                <div className="w-100 mb-5 d-flex justify-content-start align-items-center">
                  <h5 className="form-label text-left ml-1">is read?</h5>
                  <Field
                    name="read"
                    type="checkbox"
                    className="form-checkbox ml-3"
                    disabled={false}
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
                  <div className="d-flex">
                    <h5 className="form-label text-left ml-1">Icon</h5>
                    <Field
                      name="icon"
                      className="form-control ml-2 mb-2"
                      disabled={false}
                      value={values.icon}
                      style={{ width: "50px" }}
                    />
                  </div>
                  <Picker
                    onEmojiClick={(event, emojiObject) => {
                      setFieldValue("icon", emojiObject?.emoji);
                    }}
                    disableSkinTonePicker={true}
                    disableSearchBar={true}
                    pickerStyle={{ width: "100%", height: "200px" }}
                    disableAutoFocus={true}
                  />
                </div>

                <div className="d-flex justify-content-around w-100">
                  <button
                    className="btn btn-outline-secondary round-btn control-btn"
                    onClick={() => history.push("/")}
                    type="button"
                    disabled={false}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary round-btn control-btn"
                    type="submit"
                    disabled={false}
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

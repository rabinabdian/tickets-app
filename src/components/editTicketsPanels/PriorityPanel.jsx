import React from "react";
import { Field } from "formik";

export default function PriorityPanel({
  priority,
  setFieldValue,
  handlePriorityClick,
}) {
  const createPriorityButton = ({ value, color }) => {
    return (
      <Field
        id="priority"
        className="btn border priority-btn ml-2"
        type="button"
        value={value}
        style={
          priority === value
            ? {
                background: color,
              }
            : null
        }
        onClick={event => {
          setFieldValue("priority", handlePriorityClick(event));
        }}
      />
    );
  };

  return (
    <div className="input-group">
      {createPriorityButton({ value: "1", color: "#4fb9fa" })}
      {createPriorityButton({ value: "2", color: "#42ef37" })}
      {createPriorityButton({ value: "3", color: "#f2ed06" })}
      {createPriorityButton({ value: "4", color: "#fe9800" })}
      {createPriorityButton({ value: "5", color: "#d81c1c" })}
    </div>
  );
}

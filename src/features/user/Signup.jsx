import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { registerUser, selectUser } from "./userSlice";

import "./styles/loginForm.scss";

import FormFieldContainer from "../../components/formReusable/FormFieldContainer";
import FormButton from "../../components/formReusable/FormButton";

const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2)
    .max(30)
    .required("first name is a required field"),
  lastName: yup
    .string()
    .min(2)
    .max(30)
    .required("last name is a required field"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/,
      //  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      () => (
        <>
          <li>must contain 8 characters</li>
          <li>one uppercase</li>
          <li>one lowercase</li>
          <li>one number</li>
        </>
      )
    )
    .required(),
  passwordConfirmation: yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "both passwords need to be the same")
      .required("confirm password"),
  }),
});

// TODO to lower case the email in server !!!!
export default function Signup({ history }) {
  console.log("Signup render");
  const dispatch = useDispatch();

  const handleSignUp = values => {
    dispatch(registerUser(values));
  };

  return (
    <div className="d-flex justify-content-center align-items-start w-100 h-100">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "Aaaaaaaa1!",
          passwordConfirmation: "Aaaaaaaa1!",
        }}
        validationSchema={signUpSchema}
        onSubmit={values => handleSignUp(values)}
      >
        {({ errors, touched }) => (
          <Form autoComplete="false" className="d-flex flex-column login-form">
            <div className="shadow p-4 mt-5 bg-white form-container">
              <h2 className="text-center mb-2">Sign up</h2>
              <FormFieldContainer
                name="firstName"
                loading={false}
                placeholder="First name"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="lastName"
                loading={false}
                placeholder="Last name"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="email"
                loading={false}
                placeholder="Email"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="password"
                type="password"
                loading={false}
                placeholder="Password"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="passwordConfirmation"
                type="password"
                loading={false}
                placeholder="Confirm password"
                errors={errors}
                touched={touched}
              />

              <div className="d-flex flex-column align-items-center">
                <div className="alert text-danger p-0 form-error">
                  errors view
                </div>
                <FormButton
                  type={"submit"}
                  loading={false}
                  color={"btn-primary"}
                  btnText={"Sign up"}
                />
                <FormButton
                  loading={false}
                  color={"btn-outline-primary"}
                  btnText={"Back"}
                  onClick={() => history.push("/login")}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

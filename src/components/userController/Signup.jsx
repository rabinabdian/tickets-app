import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Formik, Form } from "formik";
import * as yup from "yup";
import "../styles/loginForm.scss";

import FormFieldContainer from "../formReusable/FormFieldContainer";
import FormButton from "../formReusable/FormButton";

import { signup } from "../../services/user.service";

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

export default function Signup(props) {
  const [generalErorrs, setGeneralErrors] = useState("");
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state);

  const handleSignUp = values => {
    setLoading(true);
    setResponse(
      signup(dispatch)(values)
        .then(res => setResponse(res))
        .finally(() => setLoading(false))
    );
  };

  useEffect(() => {
    if (response && response.status > 200) {
      setGeneralErrors(response.message);
    }
    return () => {
      setLoading(false);
    };
  }, [response]);

  return isLoggedIn || localStorage.getItem("token") ? (
    <Redirect to="/" />
  ) : (
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
                loading={loading}
                placeholder="First name"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="lastName"
                loading={loading}
                placeholder="Last name"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="email"
                loading={loading}
                placeholder="Email"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="password"
                type="password"
                loading={loading}
                placeholder="Password"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="passwordConfirmation"
                type="password"
                loading={loading}
                placeholder="Confirm password"
                errors={errors}
                touched={touched}
              />

              <div className="d-flex flex-column align-items-center">
                <div className="alert text-danger p-0 form-error">
                  {generalErorrs}
                </div>
                <FormButton
                  type={"submit"}
                  loading={loading}
                  color={"btn-primary"}
                  btnText={"Sign up"}
                />
                <FormButton
                  loading={loading}
                  color={"btn-outline-primary"}
                  btnText={"Back"}
                  onClick={() => props.history.push("/login")}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

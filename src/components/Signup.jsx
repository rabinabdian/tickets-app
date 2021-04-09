import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "./styles/loginForm.scss";

import { signup } from "../services/user.service";

const signUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      () => (
        <>
          <li>must contain 8 characters</li>
          <li>one uppercase</li>
          <li>one lowercase</li>
          <li>one number</li>
          <li>one special case character</li>
        </>
      )
    )
    .required(),
  passwordConfirmation: yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "both passwords need to be the same"),
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
    signup(dispatch)(values)
      .then(res => setResponse(res))
      .finally(() => setLoading(false));
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
          email: "",
          password: "Aaaaaa1!",
          passwordConfirmation: "Aaaaaa1!",
        }}
        validationSchema={signUpSchema}
        onSubmit={values => handleSignUp(values)}
      >
        {({ errors, touched }) => (
          <Form autoComplete="false" className="d-flex flex-column login-form">
            <h2 className="text-center mb-3 mt-5">Sign up</h2>
            <div className="shadow p-3 mb-5 bg-white form-container">
              <div className="mb-3">
                <div className="form-label">
                  <h4>Email</h4>
                </div>
                <Field
                  name="email"
                  className="form-control login-form-field"
                  disabled={loading}
                />
                {errors.email && touched.email && (
                  <div className="alert text-danger p-0 form-error">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <div className="form-label">
                  <h4>Password</h4>
                </div>
                <Field
                  name="password"
                  type="password"
                  className="form-control login-form-field"
                  disabled={loading}
                />
                {errors.password && touched.password && (
                  <div className="alert text-danger p-0 form-error">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <div className="form-label">
                  <h4>Confirm Password</h4>
                </div>
                <Field
                  name="passwordConfirmation"
                  type="password"
                  className="form-control login-form-field"
                  disabled={loading}
                />
                {errors.passwordConfirmation &&
                  touched.passwordConfirmation && (
                    <div className="alert text-danger p-0 form-error">
                      {errors.passwordConfirmation}
                    </div>
                  )}
              </div>

              <div className="d-flex flex-column align-items-center">
                <div className="alert text-danger p-0 form-error">
                  {generalErorrs}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-50 mb-3"
                  disabled={loading}
                >
                  Sign up
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary w-50 "
                  onClick={() => props.history.push("/login")}
                  disabled={loading}
                >
                  Back
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

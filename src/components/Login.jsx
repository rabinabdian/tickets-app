import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import "./styles/loginForm.scss";

import { login } from "../services/user.service";
import { Redirect } from "react-router";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login(props) {
  const [generalErorrs, setGeneralErrors] = useState("");
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state);

  const handleLogin = values => {
    setLoading(true);
    login(dispatch)(values)
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
        initialValues={{ email: "", password: "", showPassword: false }}
        validationSchema={loginSchema}
        onSubmit={values => handleLogin(values)}
      >
        {({ errors, touched, values }) => (
          <Form autoComplete="false" className="d-flex flex-column login-form">
            <h2 className="text-center mb-3 mt-5">Login</h2>
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
                  type={values.showPassword ? "text" : "password"}
                  className="form-control login-form-field"
                  disabled={loading}
                />
                {errors.password && touched.password && (
                  <div className="alert text-danger p-0 form-error">
                    {errors.password}
                  </div>
                )}
                <div className="form-check d-inline-flex">
                  <div className="form-check-label">show password</div>
                  <Field
                    name="showPassword"
                    type="checkbox"
                    className="form-check-input"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="d-flex flex-column align-items-center">
                <button
                  type="submit"
                  className="btn btn-primary w-50 mb-3"
                  disabled={loading}
                >
                  Login
                </button>

                <div className="alert text-danger p-0 form-error">
                  {generalErorrs}
                </div>

                <div>dont have an acount?</div>
                <button
                  className="btn btn-outline-primary w-50"
                  type="button"
                  onClick={() => props.history.push("/signup")}
                  disabled={loading}
                >
                  Sign up
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

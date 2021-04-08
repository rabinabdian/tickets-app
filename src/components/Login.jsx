import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "./styles/loginForm.scss";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const handleLogin = values => {
    console.log(values);
  };

  return (
    <div className="d-flex justify-content-center align-items-start w-100">
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
                <Field name="email" className="form-control login-form-field" />
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
                  />
                </div>
              </div>

              <div className="d-flex flex-column align-items-center">
                <button
                  type="submit"
                  className="btn btn-primary w-50 login-form-submit mb-5"
                >
                  Login
                </button>

                <button
                  type="submit"
                  className="btn btn-link w-50 login-form-submit border-primary"
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

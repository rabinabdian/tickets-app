import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import "./styles/loginForm.scss";

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

export default function Signup() {
  const handleSignUp = values => {
    console.log(values);
  };

  return (
    <div className="d-flex justify-content-center align-items-start w-100">
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirmation: "",
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
                  type="password"
                  className="form-control login-form-field"
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
                />
                {errors.passwordConfirmation &&
                  touched.passwordConfirmation && (
                    <div className="alert text-danger p-0 form-error">
                      {errors.passwordConfirmation}
                    </div>
                  )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-50 login-form-submit"
              >
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

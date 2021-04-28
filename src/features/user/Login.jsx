import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Redirect } from "react-router-dom";

import { loginUser, selectUser } from "./userSlice";

import "./styles/loginForm.scss";

import FormFieldContainer from "../../components/formReusable/FormFieldContainer";
import FormButton from "../../components/formReusable/FormButton";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login({ history }) {
  console.log("Login render");
  const dispatch = useDispatch();

  const handleLogin = values => {
    dispatch(loginUser(values));
  };

  return (
    <div className="d-flex justify-content-center align-items-start w-100 h-100">
      <Formik
        initialValues={{
          email: "email@gmail.com",
          password: "1234",
          showPassword: false,
        }}
        validationSchema={loginSchema}
        onSubmit={values => handleLogin(values)}
      >
        {({ errors, touched, values }) => (
          <Form autoComplete="false" className="d-flex flex-column login-form">
            <div className="shadow p-4 mt-5 bg-white form-container">
              <h2 className="text-center mb-2">Login</h2>
              <FormFieldContainer
                name="email"
                loading={false}
                placeholder="Email"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="password"
                type={values.showPassword ? "text" : "password"}
                loading={false}
                placeholder="Password"
                errors={errors}
                touched={touched}
              >
                <div className="form-check d-inline-flex">
                  <div className="form-check-label">show password</div>
                  <Field
                    name="showPassword"
                    type="checkbox"
                    className="form-check-input"
                    disabled={false}
                  />
                </div>
              </FormFieldContainer>

              <div className="d-flex flex-column align-items-center">
                <FormButton
                  type={"submit"}
                  loading={false}
                  color={"btn-primary"}
                  btnText={"Login"}
                />

                <div className="alert text-danger p-0 form-error">
                  errors view
                </div>

                <div className="mb-1">dont have an acount?</div>
                <FormButton
                  loading={false}
                  color={"btn-outline-primary"}
                  btnText={"Sign up"}
                  onClick={() => history.push("/signup")}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

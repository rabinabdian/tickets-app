import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import "../styles/loginForm.scss";

import { login } from "../../services/user.service";
import { Redirect } from "react-router";
import FormFieldContainer from "../formReusable/FormFieldContainer";
import FormButton from "../formReusable/FormButton";

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
    setResponse(
      login(dispatch)(values)
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
        initialValues={{ email: "", password: "", showPassword: false }}
        validationSchema={loginSchema}
        onSubmit={values => handleLogin(values)}
      >
        {({ errors, touched, values }) => (
          <Form autoComplete="false" className="d-flex flex-column login-form">
            <div className="shadow p-4 mt-5 bg-white form-container">
              <h2 className="text-center mb-2">Login</h2>
              <FormFieldContainer
                name="email"
                loading={loading}
                placeholder="Email"
                errors={errors}
                touched={touched}
              />
              <FormFieldContainer
                name="password"
                type={values.showPassword ? "text" : "password"}
                loading={loading}
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
                    disabled={loading}
                  />
                </div>
              </FormFieldContainer>

              <div className="d-flex flex-column align-items-center">
                <FormButton
                  type={"submit"}
                  loading={loading}
                  color={"btn-primary"}
                  btnText={"Login"}
                />

                <div className="alert text-danger p-0 form-error">
                  {generalErorrs}
                </div>

                <div className="mb-1">dont have an acount?</div>
                <FormButton
                  loading={loading}
                  color={"btn-outline-primary"}
                  btnText={"Sign up"}
                  onClick={() => props.history.push("/signup")}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

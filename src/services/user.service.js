import * as authActions from "../actions/auth.action";
import * as authActionTypes from "../actions/auth.actionTypes";

// TODO .env !!!!
const URL_PROTOCOL = "http";
const URL_DOMAIN = "127.0.0.1";
const URL_PORT = "8080";
const URL = `${URL_PROTOCOL}://${URL_DOMAIN}:${URL_PORT}`;

export const signup = dispatch => async ({ email, password }) => {
  // TODO fetch call
  const response = await new Promise(resolve => {
    setTimeout(() => {
      return resolve({ token: "token", status: 200, message: "success" });
    }, 2000);
  });

  if (response?.status > 300) {
    return dispatch({ type: authActionTypes.SIGNUP_FAIL, response });
  } else {
    localStorage.setItem("token", "token");
    return dispatch(authActions.signup({ response }));
  }
};

export const login = dispatch => async ({ email, password }) => {
  // TODO fetch call
  const response = await new Promise(resolve => {
    setTimeout(() => {
      return resolve({ token: "token", status: 200, message: "success" });
    }, 2000);
  });

  if (response?.status > 200) {
    return dispatch({ type: authActionTypes.LOGIN_FAIL, response });
  } else {
    localStorage.setItem("token", "token");
    return dispatch(authActions.login({ response }));
  }
};

export const logout = () => {
  console.log("logout");
  localStorage.removeItem("token", "token");
  return 200;
};

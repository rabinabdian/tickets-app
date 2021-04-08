import {
  login as apiLogin,
  logout as apiLogout,
} from "../services/user.service";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (email = "", password = "") => {
  // TODO fetch token for email and password
  const token = apiLogin(email, password);
  return {
    type: LOGIN,
    payload: {
      token,
    },
  };
};

export const logout = () => {
  // TODO delete the token from local storage
  apiLogout();
  return {
    type: LOGOUT,
  };
};

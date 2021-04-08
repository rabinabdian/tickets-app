import {
  login as apiLogin,
  logout as apiLogout,
} from "../services/user.service";
import * as actionsType from "./auth.actionTypes";

export const signup = ({ response = "" }) => {
  // TODO fetch token for email and password
  // const response = apiLogin(email, password);

  // console.log(email, password);
  return {
    type: actionsType.SIGNUP,
    response,
  };
};

export const login = ({ response = "" }) => {
  // TODO fetch token for email and password
  // const response = apiLogin(email, password);

  // console.log(email, password);
  return {
    type: actionsType.LOGIN,
    response,
  };
};

export const logout = () => {
  // TODO delete the token from local storage
  apiLogout();
  return {
    type: actionsType.LOGOUT,
  };
};

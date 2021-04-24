import * as actionsType from "./auth.actionTypes";

export const signup = ({ response = "" }) => {
  if (response) localStorage.setItem("token", response["token"]);
  return {
    type: actionsType.SIGNUP,
    response,
  };
};

export const login = ({ response = "" }) => {
  if (response) localStorage.setItem("token", response["token"]);
  return {
    type: actionsType.LOGIN,
    response,
  };
};

export const logout = () => {
  return {
    type: actionsType.LOGOUT,
  };
};

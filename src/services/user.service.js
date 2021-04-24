import * as authActions from "../actions/auth.action";
import * as authActionTypes from "../actions/auth.actionTypes";
import * as api from "../api";

export const signup = dispatch => async user => {
  const { passwordConfirmation, ...userToSend } = user;
  try {
    const response = await api.register(userToSend);
    return await dispatch(authActions.signup({ response }));
  } catch (error) {
    return await dispatch({
      type: authActionTypes.SIGNUP_FAIL,
      status: 409,
      message: error,
    });
  }
};

export const login = dispatch => async user => {
  try {
    const response = await api.login(user);
    return await dispatch(authActions.login({ response }));
  } catch (error) {
    return await dispatch({
      type: authActionTypes.LOGIN_FAIL,
      status: 401,
      message: error,
    });
  }
};

export const logout = async dispatch => {
  localStorage.removeItem("token");
  return await dispatch(authActions.logout());
};

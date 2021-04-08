import * as actionsType from "../actions/auth.actionTypes";

const loggedIn = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case actionsType.SIGNUP:
    case actionsType.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case actionsType.SIGNUP_FAIL:
    case actionsType.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default loggedIn;

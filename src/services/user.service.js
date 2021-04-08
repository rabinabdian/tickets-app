// TODO .env !!!!
const URL_PROTOCOL = "http";
const URL_DOMAIN = "127.0.0.1";
const URL_PORT = "8080";
const URL = `${URL_PROTOCOL}://${URL_DOMAIN}:${URL_PORT}`;

export const login = (email, password) => {
  console.log("login");
  // TODO rest call
  localStorage.setItem("token", "token");
  return "token";
};

export const logout = () => {
  console.log("logout");
  localStorage.removeItem("token", "token");
  return 200;
};

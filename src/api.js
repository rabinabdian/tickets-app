import axios from "axios";

// TODO seprate by path

// TODO .env !!!!
const URL_PROTOCOL = "http";
const URL_DOMAIN = "127.0.0.1";
const URL_PORT = "8080";
const URL = `${URL_PROTOCOL}://${URL_DOMAIN}:${URL_PORT}`;

// TODO the both function pretty the same so need to combine them
export const register = async user => {
  return axios({
    method: "post",
    url: `${URL}/user/register`,
    data: {
      ...user,
    },
  })
    .then(response => {
      return {
        ...response.data,
        status: response.status,
      };
    })
    .catch(error => {
      //error.response.data
      throw error.response.data["error_message"];
    });
};

// TODO the both function pretty the same so need to combine them
export const login = async user => {
  return axios({
    method: "post",
    url: `${URL}/user/login`,
    data: {
      ...user,
    },
  })
    .then(response => {
      return {
        ...response.data,
        status: response.status,
      };
    })
    .catch(error => {
      //error.response.data
      throw error.response.data["error_message"];
    });
};

export const getTickets = async ({ token }) => {
  return axios({
    method: "get",
    url: `${URL}/ticket/all`,
    headers: `Bearer ${token}`,
  })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      //error.response.data
      throw error.response.data["error_message"];
    });
};

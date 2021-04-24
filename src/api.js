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
    method: "POST",
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
    method: "POST",
    url: `${URL}/user/login`,
    data: {
      ...user,
    },
  })
    .then(response => {
      return {
        ...response?.data,
        status: response?.status,
      };
    })
    .catch(error => {
      //error.response.data
      throw error?.response?.data["error_message"];
    });
};

export const getTickets = async ({ token }) => {
  return axios({
    method: "GET",
    url: `${URL}/ticket/all`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      return {
        data: response?.data,
        status: 200,
      };
    })
    .catch(error => {
      console.log(error.response);
      //error.response.data
      return {
        data: error?.response?.data["error_message"],
        status: error.response.status,
      };
    });
};

export const checkUser = async () => {
  const token = localStorage.getItem("token");

  return axios({
    method: "GET",
    url: `${URL}/user`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      return {
        data: response?.data,
        status: 200,
      };
    })
    .catch(error => {
      console.log(error.response);
      //error.response.data
      return {
        data: error?.response?.data["error_message"],
        status: error.response.status,
      };
    });
};

export const createTicket = async (values = {}) => {
  const token = localStorage.getItem("token");

  try {
    const response = axios({
      method: "POST",
      url: `${URL}/ticket/create`,
      headers: { Authorization: `Bearer ${token}` },
      data: { ...values },
    });

    return {
      data: response?.data,
      status: 200,
    };
  } catch (error) {
    console.log(error.response);
    return {
      data: error?.response?.data["error_message"],
      status: error.response.status,
    };
  }
};

export const editTicket = async (values = {}) => {
  console.log(values);
  const token = localStorage.getItem("token");
  try {
    const response = axios({
      method: "PUT",
      url: `${URL}/ticket/update`,
      headers: { Authorization: `Bearer ${token}` },
      data: { ...values },
    });

    return {
      data: response?.data,
      status: 200,
    };
  } catch (error) {
    console.log(error.response);
    return {
      data: error?.response?.data["error_message"],
      status: error.response.status,
    };
  }
};

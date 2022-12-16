import { isExpired } from "react-jwt";

import API_ADAPTER from "service/apiService";

export const signUp = (login, password) => {
  let data = {
    login,
    password,
  };

  return API_ADAPTER.post("sign-up", data);
};

export const login = (login, password) => {
  let data = {
    login,
    password,
  };

  return API_ADAPTER.post("login", data);
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isTokenExpired = () => {
  return isExpired(localStorage.getItem("token"));
};

export const getUsername = () => {
  return localStorage.getItem("username");
};

export const setUsername = (name) => {
  return localStorage.setItem("username", name);
};

export const isLoggedIn = () => {
    return getToken() !== null;
}
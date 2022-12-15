import axios from "axios";

const REST_API_URL = "http://localhost:8080/api/";

const API_ADAPTER = axios.create({
  baseURL: REST_API_URL,
});

export default API_ADAPTER;

import axios from "axios";

const REST_API_URL = "http://127.0.0.1:8000/";

const API_ADAPTER = axios.create({
  baseURL: REST_API_URL,
});

export default API_ADAPTER;

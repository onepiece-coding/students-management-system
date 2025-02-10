import axios from "axios";

const BaseURL = axios.create({
  baseURL: "http://localhost:8000",
});

export default BaseURL;

import axios from "axios";

const techposApi = axios.create({
  baseURL: "http://192.168.0.16:5000",
  withCredentials: true,
});

export default techposApi;

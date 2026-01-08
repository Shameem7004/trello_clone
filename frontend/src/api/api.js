import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";


export default API;

import axios from "axios";

export const callIApi = axios.create({
  baseURL: import.meta.env.REACT_PUBLIC_BASE_URL,
  headers: {
    accept: "application/json",
  }
})


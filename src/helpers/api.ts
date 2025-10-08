import axios from "axios";

export const callIApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
  headers: {
    accept: "application/json",
  }
})


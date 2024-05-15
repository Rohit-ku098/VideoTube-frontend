import axios from 'axios'

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URI}/api/v1`,
  // baseURL: `/api/v1`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // "ngrok-skip-browser-warning": "69420",
  },
});


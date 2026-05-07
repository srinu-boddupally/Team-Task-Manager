import axios from "axios";

// BASE API
const API = axios.create({
  baseURL: "/api/auth",
});

// SIGNUP USER
export const signupUser = async (userData) => {
  const response = await API.post("/signup", userData);

  return response.data;
};

// LOGIN USER
export const loginUser = async (userData) => {
  const response = await API.post("/login", userData);

  return response.data;
};
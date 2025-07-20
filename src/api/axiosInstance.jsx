import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

let currentToken = null;

// Listen once and cache the token
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentToken = await user.getIdToken();
  } else {
    currentToken = null;
  }
});

axiosInstance.interceptors.request.use(async (config) => {
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  return config;
});

export default axiosInstance;

import axios from "axios";
import { auth } from "../Firebase/Firebase.init";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", 
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(async (config)=>{
  const token = await auth.currentUser?.getIdToken();
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

export default axiosInstance;

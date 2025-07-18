import axiosInstance from "./axiosInstance";

const saveUser = async (user) => {
  try {
    const res = await axiosInstance.post("/users", user);
    return res.data;
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

export default saveUser;

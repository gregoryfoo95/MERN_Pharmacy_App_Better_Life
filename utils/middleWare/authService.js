import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = 'http://localhost:3000/api/users';;

export const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };  

// Forgot Password
export const forgotPassword = async (userData) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/forgotpassword`,
        userData
      );
      toast.success(response.data.message);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
  
  // Reset Password
  export const resetPassword = async (userData, resetToken) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/users/resetpassword/${resetToken}`,
        userData
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
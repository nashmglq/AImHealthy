import { useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

// dont store success and error to avoid multiple return
export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (userData) => {
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/auth/register`, userData, {
        withCredentials: true,
      });
      return { success: response.data.success, error: null };
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong";
      return { success: null, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (userData) => {
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, userData, {
        withCredentials: true,
      });
      return { success: response.data.success, error: null };
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong";
      return { success: null, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export const useVerification = () => {
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${baseUrl}/auth/verify`, {
        withCredentials: true,
      });
      console.log(response.data.success)
      return { success: response.data.success, error: null };
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong";
      return { success: null, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading };
};


export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/auth/logout`, {
        withCredentials: true,
      });
      console.log(response.data.success)
      return { success: response.data.success, error: null };
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong";
      return { success: null, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading };
};


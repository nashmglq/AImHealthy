import { useState } from "react";
import api from "../api/axios";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await api.post("/auth/register", userData);
      setSuccess(res.data.success);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};

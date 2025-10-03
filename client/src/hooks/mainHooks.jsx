import { useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export const useDetailJournal = () => {
  const [loading, setLoading] = useState(false);

  const detailJournal = async (date) => {
    setLoading(true);

    try {
      const response = await axios.get(`${baseUrl}/journal/${date}`, {
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

  return { detailJournal, loading };
};
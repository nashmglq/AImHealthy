import { useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export const useChatBot = () => {
  const [loading, setLoading] = useState(false);

  const chatBot = async (userMessage) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/ai/chatbot`,
        { userMessage },
        { withCredentials: true }
      );
      return { success: response.data.success, error: null };
    } catch (err) {
      return { success: null, error: err.response?.data?.error || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  return { chatBot, loading };
};

export const useGenerateInsights = () => {
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/ai/insights`,
        {},
        { withCredentials: true }
      );
      return { success: response.data.success, error: null };
    } catch (err) {
      return { success: null, error: err.response?.data?.error || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  return { generateInsights, loading };
};

export const useGetChatBotMessages = () => {
  const [loading, setLoading] = useState(false);

  const getChatBotMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/ai/chatbot/messages`, {
        withCredentials: true,
      });
      return { success: response.data.success, error: null };
    } catch (err) {
      return { success: null, error: err.response?.data?.error || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  return { getChatBotMessages, loading };
};

export const useGetLatestInsight = () => {
  const [loading, setLoading] = useState(false);

  const getLatestInsight = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/ai/insights/latest`, {
        withCredentials: true,
      });
      return { success: response.data.success, error: null };
    } catch (err) {
      return { success: null, error: err.response?.data?.error || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  return { getLatestInsight, loading };
};

export const useGetAllInsights = () => {
  const [loading, setLoading] = useState(false);

  const getAllInsights = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/ai/insights/all`, {
        withCredentials: true,
      });
      return { success: response.data.success, error: null };
    } catch (err) {
      return { success: null, error: err.response?.data?.error || "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  return { getAllInsights, loading };
};
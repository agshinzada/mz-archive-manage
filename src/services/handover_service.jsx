import { notification } from "antd";
import axios from "axios";

export const fetchHandovers = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/handovers?token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchHandoverBySearch = async (value, token) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/handovers/search?s=${value}&token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchHandoverTypes = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/handovers/types?token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

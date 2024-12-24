import { notification } from "antd";
import axios from "axios";

export const fetchDelivery = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/delivery?token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

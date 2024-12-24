import { notification } from "antd";
import axios from "axios";

export async function fetchUserLogin(username, password) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_API}/auth/login?u=${username}&p=${password}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

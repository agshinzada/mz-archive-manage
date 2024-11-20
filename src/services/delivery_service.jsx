import axios from "axios";
import toast from "react-hot-toast";

export const fetchDelivery = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/delivery?token=${token}`
    );
    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

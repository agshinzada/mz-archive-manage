import axios from "axios";
import toast from "react-hot-toast";

export const fetchActs = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/acts?token=${token}`
    );
    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchActBySearch = async (value, token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/acts/search?s=${value}&token=${token}`
    );
    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

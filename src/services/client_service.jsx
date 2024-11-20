import axios from "axios";
import toast from "react-hot-toast";

export const fetchClients = async (status, token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/clients?s=${status}&token=${token}`
    );

    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchClientBySearch = async (value, status, token) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/clients/search?q=${value}&s=${status}&token=${token}`
    );
    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchClientFilesByCode = async (value, token) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/clients/files?code=${value}&token=${token}`
    );
    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

import axios from "axios";
import toast from "react-hot-toast";

export async function fetchUserLogin(username, password) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_API}/auth/login?u=${username}&p=${password}`
    );
    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
}

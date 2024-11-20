import axios from "axios";
import toast from "react-hot-toast";

export const fetchFiches = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches?token=${token}`
    );

    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchProcessingFiches = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/processing?token=${token}`
    );

    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchProcessingFichesByRange = async (data, token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_API}/fiches/processing/range?token=${token}`,
      data
    );

    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchFichesByRange = async (data, token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_API}/fiches/range?token=${token}`,
      data
    );

    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchFichesBySearch = async (param, token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/search?s=${param}&token=${token}`
    );

    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchFicheFileListByCode = async (code, type, token) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/fiches/files?c=${code}&t=${type}&token=${token}`
    );

    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchUnlinkFiches = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/unlink?token=${token}`
    );

    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchUnlinkFichesByRange = async (data, token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_API}/fiches/unlink/range?token=${token}`,
      data
    );
    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchUnlinkFichesBySearch = async (value, token) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/fiches/unlink/search?q=${value}&token=${token}`
    );

    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchUnConfirmedFiches = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/unconfirm?token=${token}`
    );

    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchUnConfirmedFichesByRange = async (data, token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_API}/fiches/unconfirm/range?token=${token}`,
      data
    );
    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const fetchUnConfirmedFichesBySearch = async (value, token) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/fiches/unconfirm/search?q=${value}&token=${token}`
    );

    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

export const updateFicheForLinked = async (fiche, file, token) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_APP_API}/fiches`, {
      fiche,
      file,
      token,
    });
    return res;
  } catch (error) {
    toast.error(error.response.data);
  }
};

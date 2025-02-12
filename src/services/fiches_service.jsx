import { notification } from "antd";
import axios from "axios";

export const fetchFiches = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches?token=${token}`
    );

    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchUnreadFiches = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/unread?token=${token}`
    );

    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchFichesCount = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/count?token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchFichesCountDetail = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/count/detail?token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchUnlinkFichesCount = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/unlink/count?token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchProblemFiches = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/problems?token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchProblemFichesBySearch = async (value, token) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/fiches/problems/search?s=${value}&token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};
export const fetchDuplicateFiches = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/duplicate?token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchDuplicateFichesBySearch = async (value, token) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/fiches/duplicate/search?s=${value}&token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchFicheByFicheNo = async (value, token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/ficheno?q=${value}&token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchProcessingFiches = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/processing?token=${token}`
    );

    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
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
    notification.error({ message: error.response.data });
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
    notification.error({ message: error.response.data });
  }
};

export const fetchFichesBySearch = async (param, token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/search?s=${param}&token=${token}`
    );

    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
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
    notification.error({ message: error.response.data });
  }
};

export const fetchUnlinkFiches = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/unlink?token=${token}`
    );

    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
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
    notification.error({ message: error.response.data });
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
    notification.error({ message: error.response.data });
  }
};

export const fetchUnConfirmedFiches = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/fiches/unconfirm?token=${token}`
    );

    return res.data;
  } catch (error) {
    notification.error({ message: error.response.data });
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
    notification.error({ message: error.response.data });
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
    notification.error({ message: error.response.data });
  }
};

export const updateFicheForLinked = async (fiche, file, token) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_APP_API}/fiches`, {
      fiche,
      file,
      token,
    });
    notification.success({ message: res.data });
    return res;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchUpdateProblemFiche = async (fiche, token) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_APP_API}/fiches/problems?token=${token}`,
      fiche
    );
    notification.success({ message: res.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchUpdateFicheStatus = async (data, token) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_APP_API}/fiches/status?token=${token}`,
      data
    );
    notification.success({ message: res.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

export const fetchUpdateFichePageStatus = async (data, token) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_APP_API}/fiches/pageStatus?token=${token}`,
      data
    );
    notification.success({ message: res.data });
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

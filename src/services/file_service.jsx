import { notification } from "antd";
import axios from "axios";

export async function fetchUploadFiles(data) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_API}/files/upload/invoice`,
      data
    );
    notification.success({ message: res.data });
    return true;
  } catch (error) {
    notification.error({ message: error.response.data });
    return false;
  }
}

export async function fetchUploadContractFiles(data) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_API}/files/upload/contract`,
      data
    );
    return res;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}
export async function fetchUploadActFiles(data) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_API}/files/upload/act`,
      data
    );
    return res;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchUploadHandoverFiles(data) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_API}/files/upload/handover`,
      data
    );
    return res;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
}

export async function fetchDownloadFiles(fileName, token) {
  try {
    const res = await axios(
      `${
        import.meta.env.VITE_APP_API
      }/files/download?name=${fileName}&token=${token}`,
      {
        responseType: "arraybuffer",
      }
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.statusText });
    return false;
  }
}

export async function fetchDownloadContractFile(fileName, token) {
  try {
    const res = await axios(
      `${
        import.meta.env.VITE_APP_API
      }/files/contract/download?name=${fileName}&token=${token}`,
      {
        responseType: "arraybuffer",
      }
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.statusText });
    return false;
  }
}

export async function fetchDownloadActFiles(fileName, token) {
  try {
    const res = await axios(
      `${
        import.meta.env.VITE_APP_API
      }/files/acts/download?name=${fileName}&token=${token}`,
      {
        responseType: "arraybuffer",
      }
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.statusText });
    return false;
  }
}

export async function fetchDownloadHandoverFiles(fileName, token) {
  try {
    const res = await axios(
      `${
        import.meta.env.VITE_APP_API
      }/files/handovers/download?name=${fileName}&token=${token}`,
      {
        responseType: "arraybuffer",
      }
    );
    return res.data;
  } catch (error) {
    notification.error({ message: error.response.statusText });
    return false;
  }
}

export const fetchRemoveFile = async (file, token) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_APP_API}/files?token=${token}`,
      {
        params: {
          file,
        },
      }
    );
    return res;
  } catch (error) {
    notification.error({ message: error.response.data });
  }
};

import { notification } from "antd";
import axios from "axios";

export async function fetchUploadFiles(data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/files/upload/invoice`,
      {
        method: "POST",
        body: data,
      }
    );
    return response;
  } catch (error) {
    console.error(
      `Error occurred while sending file copy for to the API:`,
      error
    );
  }
}

export async function fetchUploadContractFiles(data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/files/upload/contract`,
      {
        method: "POST",
        body: data,
      }
    );
    return response;
  } catch (error) {
    console.error(
      `Error occurred while sending file copy for to the API:`,
      error
    );
  }
}
export async function fetchUploadActFiles(data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/files/upload/act`,
      {
        method: "POST",
        body: data,
      }
    );
    return response;
  } catch (error) {
    console.error(
      `Error occurred while sending file copy for to the API:`,
      error
    );
  }
}

export async function fetchUploadHandoverFiles(data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API}/files/upload/handover`,
      {
        method: "POST",
        body: data,
      }
    );
    return response;
  } catch (error) {
    console.error(
      `Error occurred while sending file copy for to the API:`,
      error
    );
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
    if (res.status === 200) {
      const data = await res.data;
      return data;
    } else {
      notification.error({
        placement: "topRight",
        message: "Sistem xətası",
        description: await res.text(),
      });
    }
    return false;
  } catch (error) {
    console.error(
      `Error occurred while sending file copy for to the API:`,
      error
    );
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
    if (res.status === 200) {
      const data = await res.data;
      return data;
    } else {
      notification.error({
        placement: "topRight",
        message: "Sistem xətası",
        description: await res.text(),
      });
    }
    return false;
  } catch (error) {
    console.error(
      `Error occurred while sending file copy for to the API:`,
      error
    );
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
    if (res.status === 200) {
      const data = await res.data;
      return data;
    } else {
      notification.error({
        placement: "topRight",
        message: "Sistem xətası",
        description: await res.text(),
      });
    }
    return false;
  } catch (error) {
    console.error(
      `Error occurred while sending file copy for to the API:`,
      error
    );
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
    if (res.status === 200) {
      const data = await res.data;
      return data;
    } else {
      notification.error({
        placement: "topRight",
        message: "Sistem xətası",
        description: await res.text(),
      });
    }
    return false;
  } catch (error) {
    console.error(
      `Error occurred while sending file copy for to the API:`,
      error
    );
  }
}

export const fetchRemoveFile = async (file, token) => {
  const res = await fetch(`${import.meta.env.VITE_APP_API}/files`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      file,
      token,
    }),
  });
  if (res.status === 200) {
    notification.success({
      placement: "topRight",
      message: "Sənəd ləğvi",
      description: await res.text(),
    });
  } else {
    notification.error({
      placement: "topRight",
      message: "Sənəd ləğvi",
      description: await res.text(),
    });
  }
  return res;
};

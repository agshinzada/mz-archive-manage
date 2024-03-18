import { notification } from "antd";

export const fetchClients = async (status, token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/clients?s=${status}&token=${token}`
  );
  if (res.status === 500) {
    notification.error({
      placement: "topRight",
      message: "Sistem xətası",
      description: await res.text(),
    });
  }
  const data = await res.json();
  return data;
};

export const fetchClientBySearch = async (value, status, token) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_APP_API
    }/clients/search?q=${value}&s=${status}&token=${token}`
  );
  if (res.status === 500) {
    notification.error({
      placement: "topRight",
      message: "Sistem xətası",
      description: await res.text(),
    });
  }
  const data = await res.json();
  return data;
};

export const fetchClientFilesByCode = async (value, token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/clients/files?code=${value}&token=${token}`
  );
  if (res.status === 500) {
    notification.error({
      placement: "topRight",
      message: "Sistem xətası",
      description: await res.text(),
    });
  }
  const data = await res.json();
  return data;
};

import { notification } from "antd";

export const fetchActs = async (token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/acts?token=${token}`
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

export const fetchActBySearch = async (value, token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/acts/search?s=${value}&token=${token}`
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

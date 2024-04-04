import { notification } from "antd";

export const fetchHandovers = async (token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/handovers?token=${token}`
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

export const fetchHandoverBySearch = async (value, token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/handovers/search?s=${value}&token=${token}`
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

export const fetchHandoverTypes = async (token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/handovers/types?token=${token}`
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

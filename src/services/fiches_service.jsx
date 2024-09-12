import { notification } from "antd";

export const fetchFiches = async (token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/fiches?token=${token}`
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

export const fetchProcessingFiches = async (token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/fiches/processing?token=${token}`
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

export const fetchProcessingFichesByRange = async (range, token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/fiches/processing/range`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        range,
      }),
    }
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

export const fetchFichesByRange = async (range, token) => {
  const res = await fetch(`${import.meta.env.VITE_APP_API}/fiches/range`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      range,
    }),
  });
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

export const fetchFichesBySearch = async (param, token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/fiches/search?s=${param}&token=${token}`
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

export const fetchFicheDetailByCode = async (code, type, token) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_APP_API
    }/fiches/detail?c=${code}&t=${type}&token=${token}`
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

export const fetchFicheFileListByCode = async (code, type, token) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_APP_API
    }/fiches/files?c=${code}&t=${type}&token=${token}`
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

export const fetchUnlinkFiches = async (token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/fiches/unlink?token=${token}`
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

export const fetchUnlinkFichesByRange = async (range, token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/fiches/unlink/range`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        range,
      }),
    }
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

export const fetchUnlinkFichesBySearch = async (value, token) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_APP_API
    }/fiches/unlink/search?q=${value}&token=${token}`
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

export const fetchUnConfirmedFiches = async (token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/fiches/unconfirm?token=${token}`
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

export const fetchUnConfirmedFichesByRange = async (range, token) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API}/fiches/unconfirm/range`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        range,
      }),
    }
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

export const fetchUnConfirmedFichesBySearch = async (value, token) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_APP_API
    }/fiches/unconfirm/search?q=${value}&token=${token}`
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

export const updateFicheForLinked = async (fiche, file, token) => {
  const res = await fetch(`${import.meta.env.VITE_APP_API}/fiches`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      file,
      fiche,
      token,
    }),
  });
  return res;
};

export const fetchFiches = async (token) => {
  const res = await fetch(`http://localhost:5180/api/fiches?token=${token}`);
  const data = await res.json();
  return data;
};

export const fetchFichesBySearch = async (param, token) => {
  const res = await fetch(
    `http://localhost:5180/api/fiches/search?s=${param}&token=${token}`
  );
  const data = await res.json();
  return data;
};

export const fetchFicheDetailByCode = async (code, type, token) => {
  const res = await fetch(
    `http://localhost:5180/api/fiches/detail?c=${code}&t=${type}&token=${token}`
  );
  const data = await res.json();
  return data;
};

export const fetchFicheFileListByCode = async (code, type, token) => {
  const res = await fetch(
    `http://localhost:5180/api/fiches/files?c=${code}&t=${type}&token=${token}`
  );
  const data = await res.json();
  return data;
};

export const fetchUnlinkFiches = async (token) => {
  const res = await fetch(
    `http://localhost:5180/api/fiches/unlink?token=${token}`
  );
  const data = await res.json();
  return data;
};

export const fetchUnlinkFichesBySearch = async (value, token) => {
  const res = await fetch(
    `http://localhost:5180/api/fiches/unlink/search?q=${value}&token=${token}`
  );
  const data = await res.json();
  return data;
};

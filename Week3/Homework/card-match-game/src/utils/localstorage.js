export function loadLocalStorage(key = 'history') {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export function saveLocalStorage(data, key = 'history') {
  localStorage.setItem(key, JSON.stringify(data));
};

export function clearLocalStorage(key = 'history') {
  localStorage.removeItem(key);
};
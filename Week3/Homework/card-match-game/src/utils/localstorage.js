export const loadLocalStorage = (key = 'history') => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveLocalStorage = (data, key = 'history') => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const clearLocalStorage = (key = 'history') => {
  localStorage.removeItem(key);
};
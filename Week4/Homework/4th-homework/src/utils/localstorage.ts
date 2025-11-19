export function getData(key = "currentUser") {
  const data = localStorage.getItem(key);
  return data;
};

export function saveData(data: number, key = "currentUser") {
  localStorage.setItem(key, JSON.stringify(data));
};

export function clearData(key = "currentUser") {
  localStorage.removeItem(key);
};
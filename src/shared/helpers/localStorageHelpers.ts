export const setLocalStorage = (name: string, item: any) => {
  localStorage.setItem(name, JSON.stringify(item));
};

export const getLocalStorage = (name: string) => {
  const item = localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
};

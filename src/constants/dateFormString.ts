export const getDateString = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const shoppingDate = `${day}${month}${year}-${hour}h:${minutes}m:${seconds}s`;
  return shoppingDate;
};

export const getDateHours = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const shoppingDate = `${hour}${minutes}${seconds}`;
  return shoppingDate;
};

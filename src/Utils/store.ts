export default () => {
  const dataStorage = JSON.parse(localStorage.getItem("dataKanban") || "[]");
  return dataStorage;
};

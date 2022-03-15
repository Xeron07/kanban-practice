import ICardObj from "../models/ICardInterface";

export default () => {
  const dataStorage: ICardObj[] = JSON.parse(
    localStorage.getItem("dataKanban") || "[]"
  );
  return dataStorage;
};

const UpdateDataToStore = (data: ICardObj[]) => {
  const dataToStore = JSON.stringify(data);
  localStorage.setItem("dataKanban", dataToStore);
};

export { UpdateDataToStore };

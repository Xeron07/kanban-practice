import IItemObj from "./item";

export default interface Card {
  id: string;
  name: string;
  addedLists: IItemObj[];
  color: string;
  cardIndex: number;

  //   handleCreateCard: (id: string) => {};
  handleUpdateItemList: (id: string, list: IItemObj[]) => void;
  handleNameChange: (name: string, id: string) => void;
  handleRemovecard: (id: string) => void;
}

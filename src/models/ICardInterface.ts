import IItemObj from "./item";

export default interface ICardObj {
  name: string;
  id: string;
  color: string;
  itemList: Array<IItemObj>;
}

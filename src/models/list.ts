export default interface ListObj {
  id: string;
  name: string;
  isDragable: Boolean;
  handleNameChange: (name: string, id: string) => void;
  handleItemLock: (id: string, lock: boolean) => void;
  handleItemRemove: (id: string) => void;
}

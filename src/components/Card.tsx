import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "../models/card";
import TextareaAutosize from "react-textarea-autosize";
import ItemComponent from "./Item";
import IItemObj from "../models/item";

type State = {
  id: String;
  name: String;
};
class CardComponent extends React.Component<Card, State> {
  state = {
    name: "",
    id: "",
    index: -1,
    isEditing: false,
  };

  handleOnBlur = () => {
    if (!this.state.name) {
      this.setState((current) => ({
        ...current,
        name: this.props.name ? this.props.name : "",
      }));
    }
    this.props.handleNameChange(this.state.name, this.state.id);
    this.setState((current) => ({ ...current, isEditing: false }));
  };

  componentDidMount = () => {
    this.setState((current) => ({
      ...current,
      name: this.props.name || "",
      id: this.props.id || "",
    }));
  };

  render() {
    return (
      <>
        <div>{this.displayItem()}</div>
      </>
    );
  }

  displayItem = () => {
    if (!this.props.name) {
      return (
        <div className='max-w-sm rounded overflow-hidden shadow-lg bg-gray-400 hover:bg-gray-500'>
          <div className='px-3 py-2'>
            <div
              className='font-bold text-xl mb-2'
              style={{ textAlign: "left" }}>
              {!this.state.isEditing ? (
                <p
                  onDoubleClick={() => {
                    this.setState((current) => ({
                      ...current,
                      isEditing: true,
                    }));
                  }}>
                  Add card
                </p>
              ) : (
                <TextareaAutosize
                  className='input-card-title'
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  onBlur={this.handleOnBlur}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      this.handleOnBlur();
                    }
                    return;
                  }}
                  autoFocus
                />
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`max-w-sm rounded overflow-hidden shadow-lg bg-zinc-50`}
          style={{
            borderTop: `5px solid ${this.props.color}`,
          }}>
          <div className='px-3 py-2'>
            <div
              className='font-bold text-xl mb-2'
              style={{ textAlign: "left" }}>
              {!this.state.isEditing ? (
                <p
                  className='text-md text-black font-semibold'
                  onDoubleClick={() => {
                    this.setState((current) => ({
                      ...current,
                      isEditing: true,
                    }));
                  }}>
                  {this.state.name}
                </p>
              ) : (
                <TextareaAutosize
                  className='input-card-title'
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  onBlur={this.handleOnBlur}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      this.handleOnBlur();
                    }
                    return;
                  }}
                  autoFocus
                />
              )}
            </div>
            <div>
              {this.props.addedLists.map((obj, inx) => {
                return (
                  <div
                    key={inx}
                    draggable={!obj.isLocked}
                    onDragStart={(e) => {
                      e.dataTransfer.setData(
                        "card-index",
                        `${this.props.cardIndex}`
                      );
                      e.dataTransfer.setData("item-index", `${inx}`);
                    }}>
                    <ItemComponent
                      id={obj.id}
                      name={obj.name}
                      isDragable={obj.isLocked}
                      handleItemRemove={this.onItemRemove}
                      handleItemLock={this.onItemLockChanged}
                      handleNameChange={this.onItemNameChanged}
                    />
                  </div>
                );
              })}
            </div>
            <p className='text-gray-700' style={{ textAlign: "left" }}></p>
          </div>
          <div className='px-6 pt-4 pb-2'>
            <button
              onClick={this.onItemAdd}
              className='px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'>
              Add Item
            </button>
            &nbsp;&nbsp;
            <button
              onClick={this.onRemove}
              className='px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'>
              Remove
            </button>
          </div>
        </div>
      );
    }
  };

  onRemove = () => {
    if (window.confirm("Are you sure you want to remove this card?")) {
      this.props.handleRemovecard(this.state.id);
    } else {
      window.alert("Card not remvoed");
    }
  };

  onItemNameChanged = (id: string, name: string) => {
    let itemList = [...this.props.addedLists];
    itemList.forEach((obj) => {
      if (obj.id === id) {
        obj.name = name;
      }
    });

    this.props.handleUpdateItemList(this.state.id, itemList);
  };

  onItemRemove = (id: string) => {
    let itemList = [...this.props.addedLists];

    itemList = itemList.filter((obj) => obj.id !== id);
    this.props.handleUpdateItemList(this.state.id, itemList);
  };

  onItemAdd = () => {
    let itemList = [...this.props.addedLists];
    itemList.push({
      name: "",
      id: uuidv4(),
      isLocked: false,
    });

    this.props.handleUpdateItemList(this.state.id, itemList);
  };

  onItemLockChanged = (id: string, lock: boolean) => {
    let itemList = [...this.props.addedLists];
    itemList.forEach((obj) => {
      if (obj.id === id) {
        obj.isLocked = lock;
      }
    });
    this.props.handleUpdateItemList(this.state.id, itemList);
  };
}

export default CardComponent;

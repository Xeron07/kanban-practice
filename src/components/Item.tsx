import * as React from "react";
import ItemObject from "../models/list";
import {
  TrashIcon,
  LockOpenIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";

class ItemComponent extends React.Component<ItemObject> {
  state = {
    name: "",
    isEditing: false,
  };
  componentDidMount = () => {
    this.setState((current) => ({
      ...current,
      name: this.props.name || "",
    }));
  };
  render() {
    return <div>{this.viweLogic()}</div>;
  }

  handleOnBlur = () => {
    if (!this.state.name) {
      this.setState((current) => ({
        ...current,
        name: this.props.name ? this.props.name : "",
      }));
    }
    this.setState((current) => ({ ...current, isEditing: false }));
    this.props.handleNameChange(this.props.id, this.state.name);
  };

  handleLock = (locked: boolean) => {
    this.props.handleItemLock(this.props.id, !this.props.isDragable);
  };

  handleRemove = () => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      this.props.handleItemRemove(this.props.id);
    } else {
      window.alert("Item not remvoed");
    }
  };

  showEmptyData = () => {
    return (
      <div>
        {!this.state.isEditing ? (
          <div className='max-w-xs rounded overflow-hidden shadow-lg my-1'>
            <div className='px-1 py-1' style={{ background: "white" }}>
              <p
                onDoubleClick={() => {
                  this.setState((current) => ({
                    ...current,
                    isEditing: true,
                  }));
                }}>
                Add Description
              </p>
            </div>
          </div>
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
    );
  };

  showData = () => {
    return (
      <div className='max-w-xs rounded overflow-hidden shadow-lg my-1 '>
        <div
          className='px-1 py-1'
          style={{ background: "white", borderBottom: "3px solid skyblue" }}>
          <div>
            {!this.state.isEditing ? (
              <div>
                <span
                  className='text-ellipsis overflow-hidden ~'
                  style={{
                    display: "inline-block",
                    width: "170px",
                    whiteSpace: "nowrap",
                    overflow: "hidden !important",
                    textOverflow: "ellipsis",
                  }}
                  onDoubleClick={() => {
                    this.setState((current) => ({
                      ...current,
                      isEditing: true,
                    }));
                  }}>
                  {this.state.name}
                </span>
                <div>
                  <TrashIcon
                    onClick={this.handleRemove}
                    className='h-5 w-5 text-red-500'
                    style={{ display: "inline" }}
                  />
                  {this.props.isDragable ? (
                    <LockClosedIcon
                      onClick={() => {
                        this.handleLock(false);
                      }}
                      className='h-5 w-5 text-rose-200'
                      style={{ display: "inline" }}
                    />
                  ) : (
                    <LockOpenIcon
                      onClick={() => {
                        this.handleLock(true);
                      }}
                      className='h-5 w-5 text-green-400'
                      style={{ display: "inline" }}
                    />
                  )}
                </div>
              </div>
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
  };

  viweLogic = () => {
    return this.props.name ? this.showData() : this.showEmptyData();
  };
}

export default ItemComponent;

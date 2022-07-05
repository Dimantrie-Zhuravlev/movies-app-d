import React, { Component } from "react";
import "./task.scss";
import { formatDistanceToNow } from "date-fns";

import { ITodoItem } from "../interfaces";

export default class Task extends Component<{
  // element: ITodoItem;
  // deleteItem: (id: number) => void;
  // changeDone: (id: number) => void;
  // changeRename: (id: number) => void;
  // changeName: (id: number, newName: string) => void;
}> {
  render() {
    // const { name, id, time, done, rename } = this.props.element;
    return <div className="task-container"></div>;
  }
}

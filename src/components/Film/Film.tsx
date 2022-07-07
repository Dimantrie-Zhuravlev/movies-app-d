import React, { Component } from "react";
import "./Film.scss";

import FilmInfo from "../../services";
import { filmItem } from "../interfaces";
// import { formatDistanceToNow } from "date-fns";

// import { ITodoItem } from "../interfaces";

export default class Film extends Component {
  render() {
    return (
      <div className="film-container">
        <div className="img-component">
          <img />
        </div>
        <div className="desription-component">
          {/* <div className="description-header">
            <h2> {this.state.name}</h2>
            <span>{this.state.eslipseNumber}</span>
          </div>
          <p>{this.state.date}</p>
          <p>{this.state.types}</p>
          <p>{this.state.description}</p>
          <p>{this.state.stars}</p> */}
        </div>
      </div>
    );
  }
}

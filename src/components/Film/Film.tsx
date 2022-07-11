// eslint-disable-next-line import/order
import React, { Component } from "react";

import "./Film.scss";

import { format } from "date-fns";
import locale from "date-fns/locale/ru";

import { IFilmItem, IGenre } from "../interfaces";

// import { ITodoItem } from "../interfaces";
interface Props {
  filmInfo: IFilmItem;
  InfoAllGenres: Array<IGenre>;
}
interface State {
  genres: Array<IGenre>;
}

export default class Film extends Component<Props, State> {
  componentDidMount() {
    this.updateGenre();
  }

  state: State = { genres: [] };

  updateGenre = () => {
    const arr: Array<IGenre> = [];
    this.props.filmInfo.genre_ids.forEach((elemId) => {
      const arrItem = this.props.InfoAllGenres.find(
        (elem) => elem.id === elemId
      );
      if (arrItem) arr.push(arrItem);
    });
    this.setState({ genres: arr });
  };

  render() {
    const {
      original_title: name,
      vote_average: voteAverage,
      release_date: ReleaseDate,
    } = this.props.filmInfo;
    const res = this.state.genres.map((elem) => elem.name).join(" ");
    return (
      <div className="film-container">
        <div className="img-component">
          <img />
        </div>
        <div className="desription-component">
          <div className="description-header">
            <h2> {name}</h2>
            <span>{voteAverage}</span>
          </div>
          <p>
            {format(new Date(ReleaseDate), "PP", {
              locale,
            })}
          </p>
          <p>{res}</p>
          {/* <p className="description-text">{this.props.filmInfo.overview}</p> */}
          {/* <p>{this.state.stars}</p> */}
        </div>
      </div>
    );
  }
}

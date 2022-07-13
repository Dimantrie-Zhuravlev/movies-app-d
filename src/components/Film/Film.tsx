// eslint-disable-next-line import/order
import React, { Component } from "react";

import "./Film.scss";

import { Rate } from "antd";

import { IFilmItem, IGenre } from "../interfaces";

import FilmPoster from "./FilmComponents/FilmPoster";
import FilmHeader from "./FilmComponents/FilmHeader";
import ReleaseDate from "./FilmComponents/ReleaseDate";
import FilmGenres from "./FilmComponents/FilmGenres";

// import { ITodoItem } from "../interfaces";
interface Props {
  filmInfo: IFilmItem;
  InfoAllGenres: Array<IGenre>;
  errorGenre: boolean;
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
      title: name,
      overview,
      poster_path: addresImage,
      vote_average: average,
      release_date: releaseDate,
    } = this.props.filmInfo;
    return (
      <div className="film-container">
        <FilmPoster addresImage={addresImage} />
        <div className="desription-component">
          <FilmHeader name={name} average={average} />
          <div className="description-middle">
            <ReleaseDate date={releaseDate} />
            <FilmGenres
              hasError={this.props.errorGenre}
              elements={this.state.genres}
            />
            <p className="description-text">{overview}</p>
          </div>
          <div className="description-stars">
            <Rate
              allowHalf
              defaultValue={0}
              count={10}
              style={{ fontSize: 16, display: "flex" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

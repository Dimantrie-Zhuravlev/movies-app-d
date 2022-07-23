// eslint-disable-next-line import/order
import React, { Component } from "react";

import "./Film.scss";

import { Rate } from "antd";

import { IFilmItem, IGenre } from "../interfaces";
// import { ConsumerAllGenres } from "./../../context";

import FilmPoster from "./FilmComponents/FilmPoster";
import FilmHeader from "./FilmComponents/FilmHeader";
import ReleaseDate from "./FilmComponents/ReleaseDate";
import FilmGenres from "./FilmComponents/FilmGenres";

// import { ITodoItem } from "../interfaces";
interface Props {
  filmInfo: IFilmItem;
  InfoAllGenres: Array<IGenre>;
  errorGenre: boolean;
  addRatedFilms?: (movieId: number, rate: number) => void;
}

interface State {
  genres: Array<IGenre>;
  starsValue: number;
}

export default class Film extends Component<Props, State> {
  componentDidMount() {
    this.updateGenre();
  }

  state: State = { genres: [], starsValue: 0 };

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

  updateStars = (value: number) => {
    this.setState({ starsValue: value });
  };

  render() {
    const {
      id,
      title: name,
      overview,
      poster_path: addresImage,
      vote_average: average,
      release_date: releaseDate,
    } = this.props.filmInfo;
    const rated = this.props.filmInfo.rating
      ? this.props.filmInfo.rating
      : this.state.starsValue;
    return (
      <div className="film-container">
        <FilmPoster addresImage={addresImage} />
        <div className="desription-component">
          <FilmHeader name={name} average={average} />
          <div className="description-middle">
            <ReleaseDate date={releaseDate} />
            {/* <ConsumerAllGenres>  */}
            <FilmGenres
              hasError={this.props.errorGenre}
              elements={this.state.genres}
            />
            {/* // { </ConsumerAllGenres> } */}
            <p className="description-text">{overview}</p>
          </div>
          <div className="description-stars">
            <Rate
              allowHalf
              // defaultValue={rated}
              count={10}
              style={{ fontSize: 16, display: "flex" }}
              value={rated}
              onChange={(value) => {
                console.log(this.props.filmInfo.rating);
                this.updateStars(value);
                if (this.props.addRatedFilms)
                  this.props.addRatedFilms(id, value);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

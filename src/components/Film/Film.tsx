// eslint-disable-next-line import/order
import React, { Component } from "react";

import "./Film.scss";

import { format } from "date-fns";
import locale from "date-fns/locale/ru";
import { Typography, Rate, Image } from "antd";

import { IFilmItem, IGenre } from "../interfaces";

const { Text } = Typography;

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
      title: name,
      vote_average: voteAverage,
      release_date: ReleaseDate,
    } = this.props.filmInfo;
    const res = this.state.genres.map((elem) => (
      <Text key={elem.name} keyboard>
        {elem.name[0].toUpperCase() + elem.name.slice(1)}
      </Text>
    ));
    return (
      <div className="film-container">
        <Image
          preview={{ visible: false }}
          width={183}
          height={278}
          src={`https://image.tmdb.org/t/p/original/${this.props.filmInfo.poster_path}`}
        />
        <div className="desription-component">
          <div className="description-header">
            <h2> {name}</h2>
            <span>{voteAverage}</span>
          </div>
          <div className="description-middle">
            <p>
              {format(new Date(ReleaseDate), "PP", {
                locale,
              })}
            </p>
            <p className="description-genres">{res}</p>
            <p className="description-text">{this.props.filmInfo.overview}</p>
          </div>
          <div className="description-stars">
            <Rate
              allowHalf
              defaultValue={3.5}
              count={10}
              style={{ fontSize: 16, display: "flex" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

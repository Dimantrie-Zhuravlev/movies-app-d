import React from "react";
import "./FilmList.scss";

import Film from "../Film";
import { IlistFilm } from "../interfaces";

const FilmList = (props: IlistFilm) => {
  const elements = props.itemFilms.map((element) => {
    const { id } = element;
    return (
      <li key={id}>
        <Film
          addRatedFilms={props.addRatedFilms}
          filmInfo={element}
          InfoAllGenres={props.InfoAllGenres}
          errorGenre={props.errorGenre}
        ></Film>
      </li>
    );
  });
  return <ul className="list-style">{elements}</ul>;
};
export default FilmList;

import React from "react";

import "./FilmList.scss";
import Film from "../Film";
import { ITodoList } from "../interfaces";

const FilmList = (props: ITodoList) => {
  const elements = props.itemFilms.map((element) => {
    const { id } = element;
    return (
      <li key={id}>
        <Film></Film>
      </li>
    );
  });
  return <ul className="list-style">{elements}</ul>;
};
export default FilmList;

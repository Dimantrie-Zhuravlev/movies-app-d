import React from "react";
import { Typography } from "antd";

import { IGenre } from "../../interfaces";

const { Text } = Typography;

const FilmGenres = (props: { hasError: boolean; elements: Array<IGenre> }) => {
  const elemReturn = props.hasError ? (
    <Text keyboard>Ошибка запроса жанров</Text>
  ) : (
    props.elements.map((elem) => (
      <Text key={elem.name} keyboard>
        {elem.name[0].toUpperCase() + elem.name.slice(1)}
      </Text>
    ))
  );
  return <div className="description-genres">{elemReturn}</div>;
};

export default FilmGenres;

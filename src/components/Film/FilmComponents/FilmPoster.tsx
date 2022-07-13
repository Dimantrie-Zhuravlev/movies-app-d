import React from "react";
import { Image, Button } from "antd";

const FilmPoster = (props: { addresImage: string | undefined }) => {
  return props.addresImage ? (
    <Image
      preview={{ visible: false }}
      width={183}
      height={278}
      src={`https://image.tmdb.org/t/p/original/${props.addresImage}`}
    />
  ) : (
    <Button type="primary">Картинки нету</Button>
  );
};

export default FilmPoster;

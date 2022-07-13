import React from "react";
import { format } from "date-fns";
import locale from "date-fns/locale/ru";

const ReleaseDate = (props: { date: Date | undefined }) => {
  const elem = props.date
    ? format(new Date(props.date), "PP", {
        locale,
      })
    : null;

  return <p>{elem}</p>;
};

export default ReleaseDate;

// realDate = () =>
//   this.props.filmInfo.release_date
//     ? format(new Date(this.props.filmInfo.release_date), "PP", {
//         locale,
//       })
//     : null;

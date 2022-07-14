import React from "react";

const FilmHeader = (props: { name: string; average: number }) => {
  let averClass = "average";
  if (props.average >= 7) averClass += " rage-green";
  if (props.average >= 5 && props.average < 7) averClass += " rage-yellow";
  if (props.average >= 3 && props.average < 5) averClass += " rage-orange";
  if (props.average < 3) averClass += " rage-red";
  return (
    <React.Fragment>
      <div className="description-header">
        <h2> {props.name}</h2>
        <span className={averClass}>{Math.round(props.average * 10) / 10}</span>
      </div>
    </React.Fragment>
  );
};
export default FilmHeader;

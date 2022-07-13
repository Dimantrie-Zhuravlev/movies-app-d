import React from "react";

const FilmHeader = (props: { name: string; average: number }) => {
  let averClass = "average";
  if (props.average >= 7.5) averClass += " green";
  if (props.average >= 5) averClass += " yellow";
  else averClass += " red";
  return (
    <React.Fragment>
      <div className="description-header">
        <h2> {props.name}</h2>
        <span className={averClass}>{props.average}</span>
      </div>
    </React.Fragment>
  );
};
export default FilmHeader;

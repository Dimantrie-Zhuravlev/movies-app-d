import React from "react";
import debounce from "lodash.debounce";

import "./SearchForm.scss";

interface Iprops {
  updateSearchWord: (word: string) => void;
}

const SearchForm = (props: Iprops) => {
  return (
    <div className="searchForm-container">
      <input
        className="form-search"
        placeholder="Type to search..."
        onChange={debounce((e) => {
          if (e.target.value) {
            props.updateSearchWord(e.target.value);
          }
        }, 1500)}
      ></input>
    </div>
  );
};

export default SearchForm;

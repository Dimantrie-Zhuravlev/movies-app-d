import React from "react";
import "./headerSearch.scss";

const HeaderSearch = () => {
  return (
    <div className="header-search-container">
      <div className="header-pages">
        <span className="header-pages__search">Search</span>
        <span className="header-pages__rated">Rated</span>
      </div>
    </div>
  );
};
export default HeaderSearch;

import React, { Component } from "react";
import { Pagination } from "antd";
import "./App.scss";

import FilmInfo from "../services";

import HeaderSearch from "./HeaderSearch";
import SearchForm from "./SearchForm";
import FilmList from "./FilmList";
import { filmItem } from "./interfaces";

export default class App extends Component {
  InfoFilm = new FilmInfo();

  state = { items: [] };

  componentDidMount() {
    this.updateFilm();
  }

  updateFilm = () => {
    this.InfoFilm.getAllInfo().then(
      (body: {
        page: number;
        results: filmItem[];
        total_pages: number;
        total_results: number;
      }) => {
        console.log(body);
        this.setState({ items: body.results });
      }
    );
  };

  render() {
    return (
      <div className="global-container">
        <HeaderSearch />
        <section>
          <SearchForm />
          <FilmList itemFilms={this.state.items} />
          <Pagination defaultCurrent={1} total={20} />
        </section>
      </div>
    );
  }
}

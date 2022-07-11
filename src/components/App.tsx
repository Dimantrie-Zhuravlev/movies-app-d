import React, { Component } from "react";
import { Pagination } from "antd";
import "./App.scss";

import FilmInfo from "../services";

import HeaderSearch from "./HeaderSearch";
import SearchForm from "./SearchForm";
import FilmList from "./FilmList";
// import AppPagination from "./Pagination/Pagination";
import { IFilmItem, ITodoList, IGenre } from "./interfaces";

type Props = {};

export default class App extends Component<Props, ITodoList> {
  InfoFilm = new FilmInfo();

  InfoAllGenres: Array<IGenre> = []; // массив со всем возможными жанрами из запроса

  totalResults = 0;

  state: ITodoList = { itemFilms: [], currentPage: 1 };

  componentDidMount() {
    this.updateFilm(1);
    this.upDateGenres();
  }

  upDateGenres = () => {
    this.InfoFilm.getGenre().then((body: { genres: Array<IGenre> }) => {
      this.InfoAllGenres = body.genres;
    });
  };

  updateFilm = (page: number) => {
    this.InfoFilm.getAllInfo(page).then(
      (body: {
        page: number;
        results: Array<IFilmItem>;
        total_pages: number;
        total_results: number;
      }) => {
        this.totalResults = body.total_results;
        this.setState({ itemFilms: body.results });
      }
    );
  };

  onChangePagination = (page: number) => {
    this.setState({ currentPage: page });
    this.updateFilm(page);
  };

  render() {
    return (
      <div className="global-container">
        <HeaderSearch />
        <SearchForm />
        <section>
          <FilmList
            itemFilms={this.state.itemFilms}
            InfoAllGenres={this.InfoAllGenres}
          />
          <Pagination
            current={this.state.currentPage}
            pageSize={20}
            total={this.totalResults}
            onChange={this.onChangePagination}
            // hideOnSinglePage={true}
            showSizeChanger={false}
          />
        </section>
      </div>
    );
  }
}

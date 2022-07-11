import React, { Component, useState } from "react";
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

  state: ITodoList = { itemFilms: [], currentPage: 1, totalResults: 0 };

  componentDidMount() {
    this.updateFilm();
    this.upDateGenres();
  }

  upDateGenres = () => {
    this.InfoFilm.getGenre().then((body: { genres: Array<IGenre> }) => {
      this.InfoAllGenres = body.genres;
    });
  };

  updateFilm = () => {
    this.InfoFilm.getAllInfo().then(
      (body: {
        page: number;
        results: Array<IFilmItem>;
        total_pages: number;
        total_results: number;
      }) => {
        this.setState({
          itemFilms: body.results,
          totalResults: body.total_results,
        });
      }
    );
  };

  onChange = (page: number) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  render() {
    return (
      <div className="global-container">
        <HeaderSearch />
        <section>
          <SearchForm />
          <FilmList
            itemFilms={this.state.itemFilms.slice(
              (this.state.currentPage - 1) * 6,
              this.state.currentPage * 6
            )}
            InfoAllGenres={this.InfoAllGenres}
          />
          <Pagination
            current={this.state.currentPage}
            pageSize={6}
            total={this.state.totalResults}
            onChange={this.onChange}
          />
        </section>
      </div>
    );
  }
}

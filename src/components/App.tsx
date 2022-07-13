import React, { Component } from "react";
import { Pagination, Space, Spin, Button } from "antd";
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

  state: ITodoList = {
    itemFilms: [],
    currentPage: 1,
    loading: true,
    errorGenre: false,
    errorFilm: false,
    searchWord: "return",
    rated: false,
  };

  componentDidMount() {
    this.updateFilm(1, "return");
    this.upDateGenres();
  }

  upDateGenres = () => {
    this.InfoFilm.getGenre()
      .then((body: { genres: Array<IGenre> }) => {
        this.InfoAllGenres = body.genres;
      })
      .catch((err: Error) => {
        console.log(err);
        this.setState({ errorGenre: true });
      });
  };

  updateFilm = (page: number, searchWord: string) => {
    this.InfoFilm.getAllInfo(page, searchWord)
      .then(
        (body: {
          page: number;
          results: Array<IFilmItem>;
          total_pages: number;
          total_results: number;
        }) => {
          this.totalResults = body.total_results;
          this.setState({ itemFilms: body.results, loading: false });
        }
      )
      .catch(() => {
        this.setState({ errorFilm: true, loading: false });
      });
  };

  updateSearchWord = (word: string) => {
    this.setState({ searchWord: word, loading: true });
    this.updateFilm(1, word);
  };

  onChangePagination = (page: number) => {
    this.setState({ currentPage: page, loading: true });
    this.updateFilm(page, this.state.searchWord);
  };

  render() {
    const MainElemRender = () => {
      if (this.state.itemFilms === [])
        return <Button type="primary">Фильмов нету</Button>;
      if (this.state.errorFilm)
        return <Button type="primary">Fetch burning</Button>;

      return (
        <React.Fragment>
          <FilmList
            itemFilms={this.state.itemFilms}
            InfoAllGenres={this.InfoAllGenres}
            errorGenre={this.state.errorGenre}
          />
          <Pagination
            current={this.state.currentPage}
            pageSize={20}
            total={this.totalResults}
            onChange={this.onChangePagination}
            // hideOnSinglePage={true}
            showSizeChanger={false}
          />
        </React.Fragment>
      );
    };
    const InsertLoadingOr = () =>
      this.state.loading ? (
        <Space size="large">
          <Spin size="large" />
        </Space>
      ) : (
        <MainElemRender />
      );
    return (
      <div className="global-container">
        <HeaderSearch />
        <SearchForm updateSearchWord={this.updateSearchWord} />
        <section>
          <InsertLoadingOr />
        </section>
      </div>
    );
  }
}

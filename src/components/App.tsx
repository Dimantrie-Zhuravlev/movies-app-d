import React, { Component } from "react";
import { Pagination, Space, Spin, Button } from "antd";
import "./App.scss";
import { Offline, Online } from "react-detect-offline";

import FilmInfo from "../services";
// import { ProviderAllGenres } from "../context";

import HeaderSearch from "./HeaderSearch";
import SearchForm from "./SearchForm";
import FilmList from "./FilmList";
// import AppPagination from "./Pagination/Pagination";
import { IFilmItem, ITodoList, IGenre, ICreateGuestSessin } from "./interfaces";

type Props = {};

export default class App extends Component<Props, ITodoList> {
  InfoFilm = new FilmInfo();

  InfoAllGenres: Array<IGenre> = []; // массив со всем возможными жанрами из запроса

  totalResults = 0;

  elementRef = React.createRef();

  guestSessionId = "";

  state: ITodoList = {
    itemFilms: [],
    currentPage: 1,
    loading: true,
    errorGenre: false,
    errorFilm: false,
    searchWord: "return",
    rated: false,
    ratedFilms: [],
    ratedId: [],
  };

  componentDidMount() {
    this.updateFilm(1, "return");
    this.upDateGenres();
    this.updateGuestId();
  }

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

  updateGuestId = () => {
    this.InfoFilm.createGuestSession().then((body: ICreateGuestSessin) => {
      this.guestSessionId = body.guest_session_id;
    });
  };

  getRateMovie = () => {
    this.InfoFilm.getRatedMovies(this.guestSessionId).then(
      (body: {
        page: number;
        results: Array<IFilmItem>;
        total_pages: number;
        total_results: number;
      }) => {
        this.setState({ ratedFilms: body.results, loading: false });
      }
    );
  };

  updateRated = (ratedNew: boolean) => {
    if (ratedNew === true) this.getRateMovie();
    this.setState({
      rated: ratedNew,
    });
    if (ratedNew === false)
      this.setState({
        loading: false,
      });
  };

  addRatedFilms = (movieId: number, rate: number) => {
    this.InfoFilm.postRatedStars(this.guestSessionId, movieId, rate);
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
    const ErrorRender = this.state.errorFilm ? (
      <Button type="primary">Fetch burning</Button>
    ) : null;
    //
    const LoadingRender = this.state.loading ? (
      <Space size="large">
        <Spin size="large" />
      </Space>
    ) : null;
    //
    const MainListFilms = !this.state.rated ? (
      <React.Fragment>
        {/* <ProviderAllGenres value={this.InfoAllGenres}> */}
        <FilmList
          addRatedFilms={this.addRatedFilms}
          itemFilms={this.state.itemFilms}
          InfoAllGenres={this.InfoAllGenres}
          errorGenre={this.state.errorGenre}
        />
        {/* </ProviderAllGenres> */}
        <div className="pagination">
          <Pagination
            current={this.state.currentPage}
            pageSize={20}
            total={this.totalResults}
            onChange={this.onChangePagination}
            showSizeChanger={false}
          />
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        {/* <ProviderAllGenres value={this.InfoAllGenres}> */}
        <FilmList
          itemFilms={this.state.ratedFilms}
          InfoAllGenres={this.InfoAllGenres}
          errorGenre={this.state.errorGenre}
        />
        {/* </ProviderAllGenres> */}
      </React.Fragment>
    );
    const ZeroOrFullFilms =
      !this.state.itemFilms.length &&
      !this.state.loading &&
      !this.state.errorFilm ? (
        <Button type="primary">Фильмов по запросу нету</Button>
      ) : (
        MainListFilms
      );
    //
    const SearchPage = (
      <React.Fragment>
        <Online>
          <div className="global-container">
            <HeaderSearch updatePage={this.updateRated} />
            <SearchForm updateSearchWord={this.updateSearchWord} />
            {ErrorRender}
            {LoadingRender}
            <section>{ZeroOrFullFilms}</section>
          </div>
        </Online>
        <Offline>
          <div className="offline-container">
            <Button type="primary">У вас совсем нету интернета</Button>
          </div>
        </Offline>
      </React.Fragment>
    );
    const SearchOrRate = !this.state.rated ? (
      SearchPage
    ) : (
      <React.Fragment>
        <Online>
          <div className="global-container">
            <HeaderSearch updatePage={this.updateRated} ref={this.elementRef} />
            {ErrorRender}
            {LoadingRender}
            <section>{ZeroOrFullFilms}</section>
          </div>
        </Online>
        <Offline>
          <div className="offline-container">
            <Button type="primary">У вас совсем нету интернета</Button>
          </div>
        </Offline>
      </React.Fragment>
    );
    return SearchOrRate;
  }
}

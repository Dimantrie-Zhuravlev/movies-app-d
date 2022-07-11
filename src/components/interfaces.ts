export interface IFilmItem {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface ITodoList {
  itemFilms: Array<IFilmItem>;
  currentPage: number;
}
export type IGenre = { id: number; name: string };

export interface IlistFilm {
  itemFilms: Array<IFilmItem>;
  InfoAllGenres: Array<IGenre>;
}

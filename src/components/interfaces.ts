export interface IFilmItem {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date?: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  rating?: number;
}
export interface ITodoList {
  itemFilms: Array<IFilmItem>;
  currentPage: number;
  loading: boolean;
  errorGenre: boolean;
  errorFilm: boolean;
  searchWord: string;
  rated: boolean;
  ratedFilms: Array<IFilmItem>;
  ratedId: Array<number>;
}
export type IGenre = { id: number; name: string };

export interface IlistFilm {
  addRatedFilms?: () => void;
  itemFilms: Array<IFilmItem>;
  InfoAllGenres: Array<IGenre>;
  errorGenre: boolean;
}

export interface ICreateGuestSessin {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export default class SwapiService {
  //   apiBase = "";

  async getResource(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could nor fetch ${url} `);
    }
    return res.json();
  }

  myKey = "9ed0cd92059a9ddc501d095fe44f202b";

  getAllInfo = (page: number, searchWord: string) => {
    return this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.myKey}&query=${searchWord}&language=ru-RU&page=${page}`
    );
  };

  getGenre = () => {
    return this.getResource(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.myKey}&language=ru`
    );
  };

  createGuestSession = () => {
    return this.getResource(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.myKey}`
    );
  };

  getRatedMovies = (guestId: string) => {
    return this.getResource(
      `https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?api_key=${this.myKey}&language=ru-RU`
    );
  };

  postRatedStars = (guestId: string, movieId: number, rated: number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this.myKey}&guest_session_id=${guestId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ value: rated }),
      }
    );
  };
}

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

  researchItem = "return";

  getAllInfo = (page: number) => {
    return this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.myKey}&query=${this.researchItem}&language=ru-RU&page=${page}`
    );
  };

  getGenre = () => {
    return this.getResource(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.myKey}&language=ru`
    );
  };
}

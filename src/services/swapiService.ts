export default class SwapiService {
  //   apiBase = "";

  async getResource(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could nor fetch ${url} `);
    }
    return res.json();
  }

  getAllInfo = () => {
    return this.getResource(
      "https://api.themoviedb.org/3/search/movie?api_key=9ed0cd92059a9ddc501d095fe44f202b&query=return"
    );
  };
}

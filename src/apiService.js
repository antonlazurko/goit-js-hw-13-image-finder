const API_KEY = '18968535-a98ecca7bd1b0403c78b07ef3';
export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImageByName() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}
`;
    return fetch(url)
      .then(response => response.json())
      .then(images => {
        this.incrementPage();
        return images;
      });
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

const API_KEY = '23027480-c70d45ac3781d0e477b4a7117';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    // console.log(this);
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      pretty: true,
      per_page: 12,
      page: this.page,
    });
    // /?key=23027480-c70d45ac3781d0e477b4a7117&q=yellow+flowers&image_type=photo&pretty=true
    // const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&pretty=true&per_page=12&page=${this.page}`;
    const url = `${BASE_URL}/?${searchParams}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        console.log(hits);
        // console.log(this);
        return hits;
      });
    //   .then(({ images }) => {
    //     // this.incrementPage();
    //     return images;
    //   });
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

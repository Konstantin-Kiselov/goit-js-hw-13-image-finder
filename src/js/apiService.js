const API_KEY = '23027480-c70d45ac3781d0e477b4a7117';
const BASE_URL = 'https://pixabay.com/api/';
// const options = {
//   headers: {
//     Authorization: API_KEY,
//   },
// };

function fetchImages(searchQuery) {
  // /?key=23027480-c70d45ac3781d0e477b4a7117&q=yellow+flowers&image_type=photo&pretty=true
  const url = `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&pretty=true&per_page=12&page=1`;

  return fetch(url).then(response => response.json());
  //   .then(({ images }) => {
  //     // this.incrementPage();
  //     return images;
  //   });
}

export default { fetchImages };

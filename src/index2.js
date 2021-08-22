import './sass/main.scss';

import ImagesApiService from './js/gallery-service';
import imagesTpl from './templates/galleryList.hbs';
// console.log(imagesTpl);

// import API from './js/apiService';
// console.log(API);

const refs = {
  searchForm: document.getElementById('search-form'),
  listGallery: document.querySelector('.js-gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
// console.log(refs);

const imagesApiService = new ImagesApiService();
// console.log(imagesApiService);

refs.loadMoreBtn.setAttribute('disabled', true);
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  clearImagesContainer();
  imagesApiService.query = event.currentTarget.elements.query.value;
  //   console.log(imagesApiService.query);

  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(appendImagesMarkup);
  refs.loadMoreBtn.removeAttribute('disabled');
}

function onLoadMore() {
  // console.log('Add new photos', imagesApiService.query);
  imagesApiService.fetchImages().then(appendImagesMarkup);
  refs.listGallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function appendImagesMarkup(images) {
  refs.listGallery.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearImagesContainer() {
  refs.listGallery.innerHTML = '';
}

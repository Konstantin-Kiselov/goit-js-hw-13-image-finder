import './sass/main.scss';
import imagesTpl from './templates/galleryList.hbs';
// console.log(imagesTpl);

// import API from './js/apiService';
// console.log(API);

import ImagesApiService from './js/gallery-service';
import { declareFunction } from 'babel-types';

const refs = {
  searchForm: document.getElementById('search-form'),
  listGallery: document.querySelector('.js-gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
// console.log(refs);

const imagesApiService = new ImagesApiService();
// console.log(imagesApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  clearImagesContainer();
  imagesApiService.query = event.currentTarget.elements.query.value;
  //   console.log(imagesApiService.query);

  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(appendImagesMarkup);
}

function onLoadMore() {
  // console.log('Add new photos', imagesApiService.query);
  imagesApiService.fetchImages().then(appendImagesMarkup);
  refs.loadMoreBtn.scrollIntoView({
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

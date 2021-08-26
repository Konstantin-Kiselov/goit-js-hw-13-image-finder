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

  imagesApiService.query = event.currentTarget.elements.query.value;
  //   console.log(imagesApiService.query);
  if (imagesApiService.query.trim() === '') {
    console.log('Введите что-то нормальное :)');
    resetSearchForm();
    return;
  }

  clearImagesContainer();
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(images => {
    if (images.length === 0) {
      console.log('Введите что-то нормальное :)');
      resetSearchForm();
      return;
    }

    appendImagesMarkup(images);
    resetSearchForm();
    refs.loadMoreBtn.removeAttribute('disabled');
  });
}

function onLoadMore() {
  // console.log('Add new photos', imagesApiService.query);
  imagesApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
    scroll();
    // console.log(images.length);
    if (images.length < 12) {
      refs.loadMoreBtn.setAttribute('disabled', true);
    }
  });
}

function appendImagesMarkup(images) {
  refs.listGallery.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearImagesContainer() {
  refs.listGallery.innerHTML = '';
}

function scroll() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function resetSearchForm() {
  refs.searchForm.elements.query.value = '';
}

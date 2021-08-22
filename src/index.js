import './sass/main.scss';

import ImagesApiService from './js/gallery-service';
import imagesTpl from './templates/galleryList.hbs';
// console.log(imagesTpl);

const refs = getRefs();
// console.log(refs);
const imagesApiService = new ImagesApiService();
// console.log(imagesApiService);

// ========= Вешаем слушателя на форму =========
refs.searchForm.addEventListener('submit', onSearch);

// ========= Очищаем галерею, задаем новый поиск, сбрасываем страницу,
// запрашиваем новые фото, рендрерим галерею =========
function onSearch(event) {
  event.preventDefault();

  clearImagesContainer();
  imagesApiService.query = event.currentTarget.elements.query.value;
  //   console.log(imagesApiService.query);
  imagesApiService.resetPage();
  fetchGallery();
}

// ========= Запрашиваем картинки с сервера и рендерим их =========
function fetchGallery() {
  // console.log('Add new photos', imagesApiService.query);
  imagesApiService
    .fetchImages()
    .then(appendImagesMarkup)
    .catch(console.log)
    .finally(() => {
      refs.searchForm.elements.query.value = '';
    });
}

// ========= Создаем разметку галереи по шаблону =========
function appendImagesMarkup(images) {
  refs.listGallery.insertAdjacentHTML('beforeend', imagesTpl(images));
}

// ========= Очищаем разметку галереи =========
function clearImagesContainer() {
  refs.listGallery.innerHTML = '';
}

// ========= Выносим ссылки на элементы в функцию =========
function getRefs() {
  return {
    searchForm: document.getElementById('search-form'),
    listGallery: document.querySelector('.js-gallery'),
    sentinel: document.querySelector('#sentinel'),
  };
}

// ========= Добавляем бесконечный скролл =========
const onEntry = entries => {
  entries.forEach(entry => {
    // console.log(entry);

    if (entry.isIntersecting && imagesApiService.page > 1) {
      fetchGallery();
    }
  });
};

const options = {
  rootMargin: '150px',
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);

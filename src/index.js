import './style.css';
const searchFormTemplate = require('./templates/search-form-markup_template.hbs');
const imageCardTemplate = require('./templates/image-card-template.hbs');
import debounce from 'lodash.debounce';
import ImageApiService from './apiService.js';
import LoadMoreBtn from './components/load-more-btn';

const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const refs = {
  body: document.querySelector('body'),
};

// функция рендера разметки поиска
function searchFormMarkup() {
  const searchContainer = document.createElement('div');
  refs.body.append(searchContainer);
  searchContainer.insertAdjacentHTML('afterbegin', searchFormTemplate());
}
searchFormMarkup();

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

// функция поиска по инпуту
function onSearch(e) {
  e.preventDefault();
  imageApiService.query = e.target.value;
  console.log(e);
  if (imageApiService.query === '') {
    return alert('Введи что-то нормальное');
  }
  loadMoreBtn.show();
  imageApiService.resetPage();
  //   clearArticlesContainer();
  fetchImages();
}

// функция обработки данных из API
function fetchImages() {
  loadMoreBtn.disable();
  imageApiService.fetchImageByName().then(images => {
    imageGalleryMarkup(images);
    loadMoreBtn.enable();
  });
}

// функция рендера галлереи
function imageGalleryMarkup(images) {
  refs.body.insertAdjacentHTML('beforeend', '<ul class="gallery"></ul>');
  images.hits.map(el => {
    const image = document.createElement('li');
    const imageCardMarukp = imageCardTemplate(el);
    image.insertAdjacentHTML('afterbegin', imageCardMarukp);
    const gallery = document.querySelector('.gallery');
    gallery.append(image);
  });
}
// function clearArticlesContainer() {
//   const gallery = document.querySelector('.gallery');
//   gallery.innerHTML = '';
// }

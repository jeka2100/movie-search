import { getMovies, getMovieInfo } from './getMovies';
import { renderCardsToDOM, addRatingToCard } from './generateFilmCards';
import { changeLoadIndicator, setUnsetError } from './indicators';
import { cleanCarousel, carousel } from './carousel';
import translateWord from './wordTranslate';
import Modal from './modal';

const searchFormInput = document.querySelector('.searchForm__input');

const searchFilm = (search, page) => {
  changeLoadIndicator('on');
  getMovies(search, page)
    .then((data) => {
      if (data.Response === 'False') {
        setUnsetError(data.Error);
        throw new Error('Error in IMDB!');
      }
      if (page === 1) {
        cleanCarousel();
      }
      renderCardsToDOM(data.Search);
      return data.Search;
    })
    .then((data) => {
      const rat = data.map((elem) => {
        const get = getMovieInfo(elem.imdbID)
          .finally(() => changeLoadIndicator('off'))
          .then((filmRating) => {
            addRatingToCard(filmRating.imdbRating, elem.imdbID);
          });
        return get;
      });
      return rat;
    })
    .catch((error) => error);
};

const startSearch = () => {
  const search = searchFormInput.value;
  if (search !== '') {
    setUnsetError('no');
    if (/[А-яёЁ]/.test(search)) {
      translateWord(search).then((word) => {
        setUnsetError('translate', word.text[0]);
        searchFilm(word.text[0], 1);
      });
      return;
    }
    searchFilm(search, 1);
  }
};

const addSearchFormClickHandler = () => {
  const searchFormArea = document.querySelector('.searchForm');
  searchFormArea.addEventListener('click', (event) => {
    if (event.target.closest('.searchForm__clear')) {
      searchFormInput.value = '';
    } else if (event.target.closest('.searchForm__keyboard')) {
      const keyboard = document.querySelector('.virtualKeyboard');
      const footer = document.querySelector('.footer');
      if (keyboard.classList.contains('hidden')) {
        keyboard.classList.remove('hidden');
        footer.classList.add('keyboard');
      } else {
        keyboard.classList.add('hidden');
        footer.classList.remove('keyboard');
      }
    } else if (event.target.closest('.searchForm__button')) {
      event.preventDefault();
      startSearch();
    }
  });
};

const addCarouselClickHandler = () => {
  const carouselArea = document.querySelector('.owl-carousel');
  carouselArea.addEventListener('click', (event) => {
    if (event.target.classList.contains('film-card__about')) {
      const filmID = event.target.closest('.film-card').id;
      getMovieInfo(filmID)
        .then((info) => {
          const modal = new Modal();
          modal.buildModal(info);
        })
        .catch((error) => error);
    }
  });
};

const nextItem = () => {
  setUnsetError('no');
  const carouselItems = document.querySelectorAll('.owl-item');
  const lastItemInCarousel = carouselItems[carouselItems.length - 1];
  if (lastItemInCarousel.classList.contains('active')) {
    const nextPage = ((carouselItems.length / 10) + 1);
    if (searchFormInput.value === '') {
      searchFilm('star-wars', nextPage);
      return;
    }
    searchFilm(searchFormInput.value, nextPage);
  }
};

carousel.on('translated.owl.carousel', () => nextItem());

window.onload = () => {
  addSearchFormClickHandler();
  addCarouselClickHandler();
  searchFilm('star wars', 1);
};

export default startSearch;

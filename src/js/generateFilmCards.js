import { addItemCarousel } from './carousel';

class FilmCard {
  constructor(title, year, poster, imdbID) {
    this.title = title;
    this.year = year;
    this.poster = poster;
    this.imdbID = imdbID;
  }

  CreateCard() {
    let template = '';
    const card = document.createElement('div');
    card.classList.add('film-card');
    card.id = this.imdbID;
    template += `<a class="film-card__title" href="https://www.imdb.com/title/${this.imdbID}/videogallery/" target="_blank"><h2>${this.title}</h2></a>`;
    if (this.poster === 'N/A') {
      template += '<p class="film-card__image"> No image</p>';
    } else {
      template += `<img class="film-card__image" src=${this.poster} alt="card">`;
    }
    template += `<h3 class="film-card__year"><i class="far fa-calendar-alt"></i> ${this.year}</h3>`;
    template += '<h3 class="film-card__rating"><i class="fas fa-star"></i></h3>';
    template += '<h3 class="film-card__about">About film</h3>';
    card.innerHTML = template;
    return card;
  }
}

const generateCard = (movies) => {
  const movieCards = [];
  movies.forEach((element) => {
    movieCards.push(new FilmCard(element.Title, element.Year, element.Poster, element.imdbID));
  });
  return movieCards;
};

const renderCardsToDOM = (movies) => {
  generateCard(movies).forEach((element) => {
    addItemCarousel(element.CreateCard());
  });
};

const addRatingToCard = (rating, imdbID) => {
  const card = document.querySelector(`#${imdbID} > .film-card__rating`);
  if (rating === 'N/A') {
    card.innerHTML += 'No rating';
  } else {
    card.innerHTML += ` ${rating}`;
  }
};

export { FilmCard, renderCardsToDOM, addRatingToCard };

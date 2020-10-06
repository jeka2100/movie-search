export default class Modal {
  constructor() {
    this.modalContent = '';
  }

  buildModal(content) {
    this.modalContent = document.createElement('div');
    this.modalContent.classList.add('modal__content');
    this.setContent(content);
    this.addCloseButton();
    this.openModal();
    this.bindEvents();
  }

  setContent(content) {
    let template = '';
    let poster = '';
    const modalBlock = document.createElement('div');
    modalBlock.classList.add('modal__block');
    const modalText = document.createElement('div');
    modalText.classList.add('modal__text');
    const title = `<h2 class="content__title">${content.Title}</h2>`;
    if (content.Poster !== 'N/A') {
      poster = `<img class="content__poster" src="${content.Poster}"></img>`;
    }
    template += `<h3 class="content__director">Director: ${content.Director}</h3>`;
    template += `<h3 class="content__genre">Genre: ${content.Genre}</h3>`;
    template += `<h3 class="content__year">Year: ${content.Year}</h3>`;
    template += `<h3 class="content__rating">Rating: ${content.imdbRating}</h3>`;
    if (content.Plot !== 'N/A') {
      template += `<p class="content__plot">${content.Plot}</p>`;
    }
    this.modalContent.innerHTML = title;
    modalText.innerHTML = template;
    modalBlock.innerHTML = poster;
    modalBlock.append(modalText);
    this.modalContent.append(modalBlock);
  }

  addCloseButton() {
    this.modalContent.innerHTML += '<i class="modal__closeButton fas fa-times"></i>';
  }

  openModal() {
    document.querySelector('.overlay').classList.remove('hidden');
    document.querySelector('.modal').append(this.modalContent);
  }

  bindEvents() {
    document.querySelector('.overlay').addEventListener('click', this.closeModal);
    document.querySelector('.modal__closeButton').addEventListener('click', this.closeModal);
  }

  closeModal(event) {
    this.event = event;
    const classes = this.event.target.classList;
    if (classes.contains('overlay') || classes.contains('modal__closeButton')) {
      document.querySelector('.overlay').classList.add('hidden');
      document.querySelector('.modal').innerHTML = '';
    }
  }
}

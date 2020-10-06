import 'owl.carousel2';
import 'owl.carousel2/dist/assets/owl.carousel.css';

const carousel = jQuery('.owl-carousel');
carousel.owlCarousel({
  margin: 10,
  nav: true,
  dotsEach: true,
  navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
  responsive: {
    0: {
      items: 1,
    },
    425: {
      items: 2,
    },
    767: {
      items: 3,
    },
    1024: {
      items: 4,
    },
  },
});

const addItemCarousel = (card) => {
  carousel
    .trigger('add.owl.carousel', [card])
    .trigger('refresh.owl.carousel');
};

const cleanCarousel = () => {
  const cards = document.querySelectorAll('.film-card').length;
  for (let i = 0; i < cards; i += 1) {
    carousel
      .trigger('remove.owl.carousel', 0);
  }
  carousel
    .trigger('refresh.owl.carousel');
  return 1;
};

export { addItemCarousel, cleanCarousel, carousel };

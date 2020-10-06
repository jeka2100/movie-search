const { translate } = require('../dist/script');
const { getMovies } = require('../dist/script');

test('Translate word', () => {
  expect(translate('мечта')).toBe({});
});

test('Search film', () => {
  expect(getMovies('dream')).toBe({});
});

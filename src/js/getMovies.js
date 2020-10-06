import { changeLoadIndicator, setUnsetError } from './indicators';

const IMDBapiKey = '79c8b067';

const getMovieInfo = async (filmID) => {
  try {
    const url = `https://www.omdbapi.com/?i=${filmID}&apikey=${IMDBapiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    setUnsetError('errorInCode');
    return error;
  }
};

const getMovies = async (search, page) => {
  try {
    const urlMovies = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=${IMDBapiKey}`;
    const res = await fetch(urlMovies);
    const data = await res.json();
    return data;
  } catch (error) {
    changeLoadIndicator('off');
    setUnsetError('errorInCode');
    throw new Error('Error in IMDB!');
  }
};

export { getMovies, getMovieInfo };

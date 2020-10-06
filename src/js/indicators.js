const changeLoadIndicator = (state) => {
  const indicator = document.querySelector('.searchForm__searching');
  if (state === 'off') {
    indicator.classList.add('hidden');
  } else if (state === 'on') {
    indicator.classList.remove('hidden');
  }
};

const setUnsetError = (error, engWord) => {
  const errorElem = document.querySelector('.filmsContainer__errors');
  if (error === 'no') {
    errorElem.innerHTML = '';
    return;
  }
  if (error === 'errorInCode') {
    errorElem.innerHTML = 'Something went wrong!';
    return;
  }
  if (error === 'translate') {
    errorElem.innerHTML = `Showing results for: ${engWord}`;
    return;
  }
  errorElem.innerHTML = error;
  changeLoadIndicator('off');
};

export { changeLoadIndicator, setUnsetError };

import { codes, ruKeys, enKeys } from './keyboardKeys';
import startSearch from '../searchForm';

let keysLang = localStorage.getItem('KeysLang');

const CreateKeyboard = (lang, shift) => {
  keysLang = lang === ruKeys ? 'ru' : 'en';
  localStorage.setItem('KeysLang', keysLang);
  document.querySelector('.virtualKeyboardContainer').innerHTML = '';
  let key;
  for (let i = 0; i < lang.length; i += 1) {
    key = document.createElement('div');
    key.classList = 'key';
    key.id = codes[i];
    if (Array.isArray(lang[i])) {
      key.innerHTML = lang[i][shift];
    } else {
      key.innerHTML = lang[i];
    }
    document.querySelector('.virtualKeyboardContainer').append(key);
  }
};

const ChangeCase = (keysLang1, switchTo) => {
  if (keysLang1 === 'ru') {
    CreateKeyboard(ruKeys, switchTo);
  } else {
    CreateKeyboard(enKeys, switchTo);
  }
};

const ChangeLang = (keysLang1) => {
  if (keysLang1 === 'ru') {
    CreateKeyboard(enKeys, 0);
  } else {
    CreateKeyboard(ruKeys, 0);
  }
};

let capsLock = false;
let caretStart;
let caretEnd;
const inputText = (ev) => {
  const textarea = document.querySelector('.searchForm__input');
  caretStart = textarea.selectionStart;
  caretEnd = textarea.selectionEnd;
  window.event.returnValue = false;
  textarea.focus();
  if (ev === 'CapsLock') {
    if (!capsLock) {
      ChangeCase(keysLang, 1);
      document.querySelector('#CapsLock').classList.add('key-pressed');
      capsLock = true;
    } else {
      document.querySelector('#CapsLock').classList.remove('key-pressed');
      ChangeCase(keysLang, 0);
      capsLock = false;
    }
  } else if (ev === 'ChangeLang') {
    ChangeLang(keysLang);
  } else if (ev === 'Backspace') {
    if (caretStart !== caretEnd) {
      textarea.value = textarea.value.slice(0, caretStart) + textarea.value.slice(caretEnd);
      textarea.selectionStart = caretStart;
      textarea.selectionEnd = caretStart;
    } else {
      textarea.value = textarea.value.slice(0, caretStart - 1) + textarea.value.slice(caretEnd);
      textarea.selectionStart = caretStart - 1;
      textarea.selectionEnd = caretStart - 1;
    }
  } else if (ev === 'Delete') {
    if (caretStart !== caretEnd) {
      textarea.value = textarea.value.slice(0, caretStart) + textarea.value.slice(caretEnd);
      textarea.selectionStart = caretStart;
      textarea.selectionEnd = caretStart;
    } else {
      textarea.value = textarea.value.slice(0, caretStart) + textarea.value.slice(caretEnd + 1);
      textarea.selectionStart = caretStart;
      textarea.selectionEnd = caretStart;
    }
  } else if (ev === 'ArrowLeft') {
    if (caretStart !== 0) {
      textarea.selectionStart = caretStart - 1;
      textarea.selectionEnd = caretStart - 1;
    }
  } else if (ev === 'ArrowRight') {
    textarea.selectionStart = caretStart + 1;
    textarea.selectionEnd = caretStart + 1;
  } else if (ev === 'Enter') {
    startSearch();
  } else if (ev === 'Space') {
    textarea.value = `${textarea.value.slice(0, caretStart)} ${textarea.value.slice(caretStart)}`;
    textarea.selectionStart = caretStart + 1;
    textarea.selectionEnd = caretStart + 1;
  } else if (ev === 'Tab') {
    textarea.value = `${textarea.value.slice(0, caretStart)}    ${textarea.value.slice(caretStart)}`;
    textarea.selectionStart = caretStart + 4;
    textarea.selectionEnd = caretStart + 4;
  } else if (ev === 'ShiftLeft') {
    ChangeCase(keysLang, 1);
    document.querySelector('#ShiftLeft').classList.add('key-pressed');
  } else if (ev === 'ShiftRight') {
    ChangeCase(keysLang, 1);
    document.querySelector('#ShiftRight').classList.add('key-pressed');
  } else if (ev !== 'Tab' && ev !== 'Delete' && ev !== 'ControlLeft' && ev !== 'ChangeLang' && ev !== 'AltLeft' && ev !== 'AltRight' && ev !== 'ControlRight') {
    textarea.value = textarea.value.slice(0, caretStart) + document.querySelector(`#${ev}`).innerText + textarea.value.slice(caretStart);
    textarea.selectionStart = caretStart + 1;
    textarea.selectionEnd = caretStart + 1;
  }
};

const MouseDown = (event) => {
  const target = event.target.closest('.key');
  if (target.classList.contains('key')) {
    target.classList.add('key-pressed');
    inputText(target.id);
  }
};

const MouseUp = (event) => {
  const target = event.target.closest('.key');
  if (target.classList.contains('key')) {
    if (target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
      ChangeCase(keysLang, 0);
    } else if (target.id === 'CapsLock') {
      return;
    }
    target.classList.remove('key-pressed');
  }
};

CreateKeyboard(keysLang === 'ru' ? ruKeys : enKeys, 0);

const keyboard = document.querySelector('.virtualKeyboard');
keyboard.addEventListener('mousedown', MouseDown);
keyboard.addEventListener('mouseup', MouseUp);

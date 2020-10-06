import { changeLoadIndicator, setUnsetError } from './indicators';

const YandexApiKey = 'trnsl.1.1.20200503T105702Z.9a356ae2c5f58d2e.d60a7853000b7e1dad444643f632882c43919166';

export default async (word) => {
  try {
    setUnsetError('no');
    const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${YandexApiKey}&text=${word}&lang=ru-en`;
    const res = await fetch(urlTranslate);
    const data = await res.json();
    return data;
  } catch (error) {
    changeLoadIndicator('off');
    setUnsetError('errorInCode');
    throw new Error('Error in Yandex!');
  }
};

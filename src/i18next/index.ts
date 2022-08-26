import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import moment from 'moment';
import en from './en/translation.json';
import ru from './ru/translation.json';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    format: function (value, format) {
      if (format === 'uppercase') return value.toUpperCase();
      if (value instanceof Date) return moment(value).format(format);
      return value;
    },
  },
});

export default i18next;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLang from "../locales/en/en.json"
import frLang from "../locales/fr/fr.json"
import LanguageDetector from 'i18next-browser-languagedetector';
import { init } from '../../src/functions';

init();

let lang = null;
lang = window.localStorage.getItem('lang') || null;

i18n
 
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enLang },
      fr: { translation: frLang },
      // es: { translation: esLang },
      // pt: { translation: ptLang },
      // zh_CN: { translation: zh_CNLang },
    },
    lng: lang,
    fallbackLng: 'fr',
    debug: false,

    interpolation: {
      escapeValue: false,
    }
  });


export default i18n;
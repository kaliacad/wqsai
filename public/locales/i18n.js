import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLang from "../locales/en/en.json";
import frLang from "../locales/fr/fr.json";
// ADD: Spanish translations import
import esLang from "../locales/es/es.json";
import swLang from "../locales/sw/sw.json";
import arLang from "../locales/ar/ar.json";
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
      // ADD: Register Spanish
      es: { translation: esLang },
      sw: { translation: swLang },
      ar: { translation: arLang }
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
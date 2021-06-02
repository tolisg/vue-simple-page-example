import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { localize } from 'vee-validate';
import { LANG_FALLBACK, LANG } from '@/shared/config';
import enLocale from './locales/en.json';

Vue.use(VueI18n);

export const supportedlanguages = ['en', 'el'];
const defaultLang = LANG_FALLBACK || 'en';
const loadedLanguages = [defaultLang];

export function isValidLanguage(lang) {
  return Object.keys(supportedlanguages).includes(lang);
}

export function getStartingLocale() {
  // if language at local storage
  const chooseLanguage = window.localStorage.getItem('language');
  if (chooseLanguage) {
    return chooseLanguage;
  }
  const language = (navigator.language || navigator.browserLanguage).toLowerCase();
  if (language && isValidLanguage(language)) {
    return language;
  }
  return defaultLang;
}

function loadLocaleMessages() {
  const locales = enLocale;
  // console.log(locales);
  const messages = {
    en: locales
  };
  return messages;
}

async function setValidatorLanguage(lang) {
  let defaultMessages = {};
  // Load default validator messages
  if (lang === 'el') {
    defaultMessages = await import('vee-validate/dist/locale/el.json');
  } else {
    defaultMessages = await import('vee-validate/dist/locale/en.json');
  }
  // Load custom validator messages
  const customMessages = await import(/* webpackChunkName: "i18-[request]" */ `./i18n_${lang}.json`);
  // Merge default and custom messages
  defaultMessages.default.messages = { ...defaultMessages.messages, ...customMessages.messages };
  localize(lang, defaultMessages);
}

export const i18n = new VueI18n({
  locale: LANG || 'en',
  fallbackLocale: LANG_FALLBACK || 'en',
  messages: loadLocaleMessages()
});
export function setI18nLanguage(lang) {
  i18n.locale = lang;
  setValidatorLanguage(lang);
  document.querySelector('html').setAttribute('lang', lang);
  window.localStorage.setItem('language', lang);
  return lang;
}

export async function loadLanguageAsync(lang) {
  // Make sure it's a valid language
  let language = lang;
  if (!supportedlanguages.includes(language)) {
    language = defaultLang;
  }

  // If the language was already loaded
  if (loadedLanguages.includes(language)) {
    return setI18nLanguage(language);
  }
  // If the language hasn't been loaded yet
  const messages = await import(/* webpackChunkName: "lang-[request]" */ `./locales/${language}.json`);
  i18n.setLocaleMessage(language, messages);
  loadedLanguages.push(language);
  return setI18nLanguage(language);
}

loadLanguageAsync(getStartingLocale());

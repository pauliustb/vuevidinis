import { createI18n } from 'vue-i18n';
import en from './i18n/en';
import lt from './i18n/lt';

const uerLang = window.location.pathname.startsWith('/en') ? 'en' : 'lt';

const i18n = createI18n({
    legacy: false,
    locale: uerLang,
    fallbackLocale: 'lt',
    messages: { en, lt },
});

export default i18n;
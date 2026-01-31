import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";
import mr from "./locales/mr/translation.json";
import gu from "./locales/gu/translation.json"; // ✅ ADD GUJARATI
import te from "./locales/te/translation.json"; // ✅ ADD TELUGU
import ta from "./locales/ta/translation.json"; // ✅ ADD TAMIL
import bn from "./locales/bn/translation.json"; // ✅ ADD BENGALI
import kn from "./locales/kn/translation.json"; // ✅ ADD KANNADA

// ✅ GET SAVED LANGUAGE FROM LOCALSTORAGE
const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            hi: { translation: hi },
            mr: { translation: mr },
            gu: { translation: gu }, // ✅ ADD THIS
            te: { translation: te }, // ✅ ADD THIS
            ta: { translation: ta }, // ✅ ADD THIS
            bn: { translation: bn }, // ✅ ADD THIS
            kn: { translation: kn }, // ✅ ADD THIS
        },
        lng: savedLanguage, // ✅ CHANGED FROM "en" to savedLanguage
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
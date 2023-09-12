import { useContext } from 'react';
import { LanguageContext } from 'language/LanguageContext';
import { ILanguagePack } from 'language/translations/ILanguagePack';
import { en } from 'language/translations/en';
import { pt } from 'language/translations/pt';

const translations: { [key: string]: ILanguagePack } = {
  en,
  pt,
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }

  const { language } = context;

  function t(key: string): string {
    const translationKeys = key.split('.');
    let translation = translations[language] as any;

    for (const translationKey of translationKeys) {
      translation = translation[translationKey];

      if (!translation) {
        return key;
      }
    }

    return translation;
  }

  return {
    t,
    language,
  };
};

export default useTranslation;
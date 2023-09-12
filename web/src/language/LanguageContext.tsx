// context/LanguageContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

const DEFAULT_LANGUAGE = 'pt';

interface ILanguageContext {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export const LanguageContext = createContext<ILanguageContext | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(DEFAULT_LANGUAGE);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

import React, { useState, createContext, useContext } from 'react';
import { languageOptions, dictionaryList } from '../Languages';

export const LanguageContext = createContext({
    userLanguage: 'English',
    dictionary: dictionaryList.English
});

export function LanguageProvider({ children }) {
    const defaultLanguage = window.localStorage.getItem('rcml-lang');
    const [userLanguage, setUserLanguage] = useState(defaultLanguage || 'English');

    const provider = {
        userLanguage,
        dictionary: dictionaryList[userLanguage],
        userLanguageChange: selected => {
            const newLanguage = languageOptions[selected] ? selected : 'English';
            setUserLanguage(newLanguage);
            window.localStorage.setItem('rcml-lang', newLanguage);
        }
    };
    return (
        <LanguageContext.Provider value={provider}>
            {children}
        </LanguageContext.Provider>
    );
};

// get text according to id & current language
export function Text({ tid }) {
    const languageContext = useContext(LanguageContext);

    return languageContext.dictionary[tid] || tid;
};

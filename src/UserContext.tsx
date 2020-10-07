import React from 'react';
import words from './data/words';
import { UserContextData, WordItem } from './interfaces';

export const defaultContext: UserContextData = {
    words,
    pushWord: (word: string, translation: string) => {
        words[word] = {
            translation,
            progress: 0
        };
    },
    updateWord: (word: string, data: WordItem) => {
        words[word] = data;
    },
    userData: false
}
export const UserContext = React.createContext(defaultContext);
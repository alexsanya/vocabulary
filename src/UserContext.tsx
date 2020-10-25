import React from 'react';
import words from './data/words';
import { UserContextData, WordItem, Mode } from './interfaces';

let filter = '';

export const defaultContext: UserContextData = {
    words,
    pushWord: (word: string, translation: string) => {
        words[word] = {
            translation,
            progress: 0
        };
    },
    filter,
    setFilter: (pattern: string) => {
        filter = pattern;
    },
    removeWord: (word: string) => {
        delete words[word];
    },
    updateWord: (word: string, data: WordItem) => {
        words[word] = data;
    },
    setMode: (mode: Mode) => {},
    userData: false,
    mode: Mode.SHOW_ORIGINAL
}
export const UserContext = React.createContext(defaultContext);
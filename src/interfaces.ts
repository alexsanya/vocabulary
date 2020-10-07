export interface WordItem {
    id?: string;
    translation: string;
    progress: number;
}

export type UserCredential = {uid: string} | boolean;
export type NewWordSubmitFunction = (word: string, translation: string) => void;
export type WordUpdateFunction = (word: string, data: WordItem) => void;
export type SetModeFunction = (mode: Mode) => void;
export enum Mode {SHOW_ORIGINAL, SHOW_TRANSLATION};

export interface WordsList {
    [key: string]: WordItem;
}

export interface UserContextData {
    words: WordsList;
    mode: Mode;
    setMode: SetModeFunction,
    userData: UserCredential;
    pushWord: NewWordSubmitFunction;
    updateWord: WordUpdateFunction;
}

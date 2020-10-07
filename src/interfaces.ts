export interface WordItem {
    id?: string;
    translation: string;
    progress: number;
}

export type UserCredential = {uid: string} | boolean;
export type NewWordSubmitFunction = (word: string, translation: string) => void;
export type WordUpdateFunction = (word: string, data: WordItem) => void;

export interface WordsList {
    [key: string]: WordItem;
}

export interface UserContextData {
    words: WordsList;
    userData: UserCredential,
    pushWord: NewWordSubmitFunction;
    updateWord: WordUpdateFunction;
}

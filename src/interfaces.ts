export interface WordItem {
    id?: string;
    translation: string;
    progress: number;
}

export type UserCredential = object | boolean;
export type NewWordSubmitFunction = (word: string, translation: string) => void;
export type WordUpdateFunction = (word: string, data: WordItem) => void;
export type OnSignInFunction = (userData: UserCredential) => void;

export interface WordsList {
    [key: string]: WordItem;
}

export interface UserContextData {
    words: WordsList;
    userData: UserCredential,
    pushWord: NewWordSubmitFunction;
    updateWord: WordUpdateFunction;
    onSignIn: OnSignInFunction;
}

export interface WordItem {
    translation: string;
    progress: number;
}

export type NewWordSubmitFunction = (word: string, translation: string) => void;
export type WordUpdateFunction = (word: string, data: WordItem) => void;

export interface WordsList {
    [key: string]: WordItem;
}

export interface UserContextData {
    words: WordsList;
    pushWord: NewWordSubmitFunction;
    updateWord: WordUpdateFunction;
}

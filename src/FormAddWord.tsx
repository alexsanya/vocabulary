import React, { useState, FormEvent, ChangeEvent } from 'react'
import './FormAddWord.css';
import { NewWordSubmitFunction } from './interfaces';

interface FormAddWordProps {
    pushWord: NewWordSubmitFunction;
}

export default function FormAddWord(props: FormAddWordProps) {

    const [word, setWord] = useState('');
    const [translation, setTrnslation] = useState('');
    const { pushWord } = props;

    const handleWordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    }

    const handleTranslationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTrnslation(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        pushWord(word, translation);
    }

    return (
        <div className="addWord__wrap">
            <div className="addWord">
                <div className="row row__button">
                    <button className="btn__add"> + </button>
                </div>
                <div className="row row__input">
                    <form className="form__add" onSubmit={handleSubmit}>
                        <input className="word__original" value={word} onChange={handleWordChange}></input>
                        <input type="text" className="word__translation" value={translation} onChange={handleTranslationChange}></input>
                        <button type="submit"></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

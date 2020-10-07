import React, { useState, FormEvent, ChangeEvent } from 'react'
import { TextField } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { CSSTransition } from 'react-transition-group';
import './FormAddWord.css';
import { NewWordSubmitFunction } from './interfaces';

interface FormAddWordProps {
    pushWord: NewWordSubmitFunction;
}

export default function FormAddWord(props: FormAddWordProps) {

    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [inputsShown, setInputsShown] = useState(false);
    const { pushWord } = props;

    const handleWordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    }

    const handleTranslationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTranslation(e.target.value);
    }

    const handleAddBtnClick = () => {
        setInputsShown(!inputsShown);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        pushWord(word, translation);
        setWord('');
        setTranslation('');
        setInputsShown(false);
    }

    return (
        <div className="addWord__wrap">
            <div className="addWord">
                <div className="row row__button">
                    <AddCircleRoundedIcon fontSize="large" style={{ color: 'black', cursor: 'pointer' }} onClick={handleAddBtnClick} />
                </div>
                <CSSTransition
                    in={inputsShown}
                    timeout={300}
                    unmountOnExit
                    classNames="inputs">
                    <div className="row row__input">
                        <form className="form__add" onSubmit={handleSubmit}>
                            <TextField className="word__input word__original" variant="outlined" value={word} onChange={handleWordChange}/>
                            <TextField className="word__input word__translation" variant="outlined" value={translation} onChange={handleTranslationChange}/>
                            <button className="word__submit" type="submit"></button>
                        </form>
                    </div>
                </CSSTransition>
            </div>
        </div>
    )
}

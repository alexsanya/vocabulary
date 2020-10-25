import React, { useState, FormEvent, ChangeEvent } from 'react'
import { TextField } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { CSSTransition } from 'react-transition-group';
import './FormAddWord.css';
import { NewWordSubmitFunction, FilterSubmitFunction } from './interfaces';

interface FormAddWordProps {
    pushWord: NewWordSubmitFunction;
    setFilter: FilterSubmitFunction;
}

export default function FormAddWord(props: FormAddWordProps) {

    const [word, setWord] = useState('');
    const [pattern, setPattern] = useState('');
    const [translation, setTranslation] = useState('');
    const [addFormShown, setAddFormShown] = useState(false);
    const [searchFormShown, setSearchFormShown] = useState(false);
    const { pushWord, setFilter } = props;

    const handleWordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    }

    const handlePatternChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPattern(e.target.value);
        setFilter(e.target.value);
    }

    const handleTranslationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTranslation(e.target.value);
    }

    const handleAddBtnClick = () => {
        setAddFormShown(!addFormShown);
    }

    const handleSearchBtnClick = () => {
        setSearchFormShown(!searchFormShown);
    }

    const handleAddSubmit = (e: FormEvent) => {
        e.preventDefault();
        pushWord(word, translation);
        setWord('');
        setTranslation('');
        setAddFormShown(false);
    }

    return (
        <div className="addWord__wrap">
            <div className="addWord">
                <div className="row row__button">
                    <SearchRoundedIcon fontSize="large" style={{ color: 'black', cursor: 'pointer' }} onClick={handleSearchBtnClick} />
                    <AddCircleRoundedIcon fontSize="large" style={{ color: 'black', cursor: 'pointer' }} onClick={handleAddBtnClick} />
                </div>
                <div className="row row__froms">
                    <CSSTransition
                        in={searchFormShown}
                        timeout={300}
                        unmountOnExit
                        classNames="inputs">
                        <div className="row row__input">
                            <form className="form__input form__search">
                                <TextField className="word__input word__original" variant="outlined" value={pattern} onChange={handlePatternChange}/>
                            </form>
                        </div>
                    </CSSTransition>
                    { !searchFormShown ? (<div className="row row__input"></div>) : null }
                    <CSSTransition
                        in={addFormShown}
                        timeout={300}
                        unmountOnExit
                        classNames="inputs">
                        <div className="row row__input">
                            <form className="form__input form__add" onSubmit={handleAddSubmit}>
                                <TextField className="word__input word__original" variant="outlined" value={word} onChange={handleWordChange}/>
                                <TextField className="word__input word__translation" variant="outlined" value={translation} onChange={handleTranslationChange}/>
                                <button className="word__submit" type="submit"></button>
                            </form>
                        </div>
                    </CSSTransition>
                </div>
            </div>
        </div>
    )
}

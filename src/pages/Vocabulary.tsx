import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import './Vocabulary.css';
import FormAddWord from '../FormAddWord';
import { UserContextData, Mode } from '../interfaces';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

export default function Vocabulary() {
    return (
        <UserContext.Consumer>
            { (value: UserContextData) => value.userData ? (
                <VocabularyWithContext context={value}/>
            ) : (<Redirect to='/' />)}
        </UserContext.Consumer>
    )
}

const WordProgressItem = styled.li`
    -webkit-box-shadow: 10px 10px 15px -10px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 15px -10px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 15px -10px rgba(0,0,0,0.75);
    padding: 10px;
    margin: 10px 0;
    border-radius: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: black;
    font-weight: 700;
    cursor: pointer;
    ${(props: {progress: number}) => {
        const { progress } = props;
        if (progress <= 3 || progress >= 100) {
            return css`background: linear-gradient(to right, #3fffa2 ${progress}%, #e5405e 0%);`
        } else {
            return css`background: linear-gradient(to right, #3fffa2 ${progress - 20}%, #ffdb3a ${progress}%, #e5405e ${progress + 20}%);`
        }
    }}
`;

function VocabularyWithContext({ context }: { context: UserContextData}) {
    const { words, mode, pushWord, removeWord, filter, setFilter } = context;
    const [currentWord, setCurrentWord] = useState('');

    const changeCurrentWord = (word: string) => {
        if (word === currentWord) {
            setCurrentWord('');
        } else {
            setCurrentWord(word);
        }
    }

    const handleRemoveWord = (word: string) => {
        removeWord(word);
    }

    const filterWords = (key: string) => {
        if (mode === Mode.SHOW_ORIGINAL) {
            return key.indexOf(filter) >= 0;
        } else {
            return words[key].translation.indexOf(filter) >= 0;
        }
    }
    return (
        <>
            <FormAddWord pushWord={ pushWord } setFilter={ setFilter } filter={ filter } />
            <ul className="vocabulary__list">
                {Object.keys(words).filter(filterWords).map(key => (
                    <div className="word__container">
                        <WordProgressItem key={key} progress={words[key].progress} onClick={ () => changeCurrentWord(key) }>
                            <span className="item__word">{mode === Mode.SHOW_ORIGINAL ? key : words[key].translation}</span>
                            <span className="item__progress">{words[key].progress}%</span>
                        </WordProgressItem>
                        {
                            (key === currentWord) ?
                                <DeleteRoundedIcon fontSize="large" onClick={() => handleRemoveWord(key)} style={{ color: 'black', cursor: 'pointer', margin: 'auto 5px' }} />
                            :   <></>
                        }
                    </div>
                ))}
            </ul>
        </>
    );
}


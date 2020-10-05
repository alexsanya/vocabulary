import React from 'react';
import styled, { css } from 'styled-components';
import './Vocabulary.css';
import FormAddWord from '../FormAddWord';
import { UserContextData } from '../interfaces';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';

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
    return (
        <>
            <FormAddWord pushWord={context.pushWord} />
            <ul className="vocabulary__list">
                {Object.keys(context.words).map(key => (
                    <WordProgressItem key={key} progress={context.words[key].progress}>
                        <span className="item__word">{key}</span>
                        <span className="item__progress">{context.words[key].progress}%</span>
                    </WordProgressItem> 
                ))}
            </ul>
        </>
    );
}


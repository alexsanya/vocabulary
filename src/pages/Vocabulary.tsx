import React from 'react'
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
            ) : (<Redirect to='signIn' />)}
        </UserContext.Consumer>
    )
}

function VocabularyWithContext({ context }: { context: UserContextData}) {
    return (
        <>
            <FormAddWord pushWord={context.pushWord} />
            <ul className="vocabulary__list">
                {Object.keys(context.words).map(key => (
                    <li className="list__item" key={key}>
                        <span className="item__word">{key}</span>
                        <span className="item__progress">{context.words[key].progress}%</span>
                    </li> 
                ))}
            </ul>
        </>
    );
}


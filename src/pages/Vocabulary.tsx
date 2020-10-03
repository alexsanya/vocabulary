import React from 'react'
import './Vocabulary.css';
import FormAddWord from '../FormAddWord';
import { UserContextData } from '../interfaces';
import { UserContext } from '../UserContext';

export default function Vocabulary() {
    return (
        <UserContext.Consumer>
            { (value: UserContextData) => (
                <>
                    <FormAddWord pushWord={value.pushWord} />
                    <ul className="vocabulary__list">
                        {Object.keys(value.words).map(key => (
                            <li className="list__item" key={key}>
                                <span className="item__word">{key}</span>
                                <span className="item__progress">{value.words[key].progress}%</span>
                            </li> 
                        ))}
                    </ul>
                </>
            )}
        </UserContext.Consumer>
    )
}

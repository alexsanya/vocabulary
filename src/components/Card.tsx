import React from 'react'
import { WordItem } from '../interfaces';

interface CardProps {
    word: string;
    wordData: WordItem;
    onAnswer: (answer: boolean) => void;
}

export default function Card(props: CardProps) {
    const { word, wordData, onAnswer } = props;

    const handlePositive = () => {
        onAnswer(true);
    }

    const handleNegative = () => {
        onAnswer(false);
    }

    return (
        <>
            <div className="row">
                <h1 className="caption">Do you remember this word? ({wordData.progress}%)</h1>
            </div>
            <div className="row">
                <div className="wordCard">
                    <span className="word">{ word }</span>
                </div>
            </div>
            <div className="row">
                <div className="buttonsContainer">
                    <button className="cardButton" onClick={handlePositive}>Yes</button>
                    <button className="cardButton" onClick={handleNegative}>No</button>
                </div>
            </div>
        </>
    )
}

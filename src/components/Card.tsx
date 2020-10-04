import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { WordItem } from '../interfaces';

interface CardProps {
    word: string;
    wordData: WordItem;
    onAnswer: (answer: boolean) => void;
}

export default function Card(props: CardProps) {
    const { word, wordData, onAnswer } = props;

    const [showTranslation, setShowTranslation] = useState(false);

    const handlePositive = () => {
        onAnswer(true);
    }

    const handleNegative = () => {
        setShowTranslation(true);
    }

    const handleNext = () => {
        setShowTranslation(false);
        onAnswer(false);
    }

    const renderYesNoButtons = () => (
        <div className="row">
            <div className="buttonsContainer">
                <Button variant="contained" size="large" color="primary" className="cardButton" onClick={handlePositive}>
                    Yes
                </Button>
                <Button variant="contained" size="large" color="secondary" className="cardButton" onClick={handleNegative}>
                    No
                </Button>
            </div>
        </div>
    );

    const renderNextButton = () => (
        <div className="row">
            <div className="buttonsContainer singleButton">
                <Button variant="contained" size="large" color="primary" className="cardButton" onClick={handleNext}>
                    Next
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <div className="row">
                <h1 className="caption">Do you remember this word? ({wordData.progress}%)</h1>
            </div>
            <div className="row">
                <Paper elevation={3} className="wordCard">
                    <span className="word">{ showTranslation ? wordData.translation : word }</span>
                </Paper>
            </div>
            { showTranslation ?  renderNextButton() : renderYesNoButtons() }
        </>
    )
}

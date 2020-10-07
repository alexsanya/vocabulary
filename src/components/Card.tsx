import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { UserContextData, WordItem, Mode } from '../interfaces';
import { UserContext } from '../UserContext';

interface CardProps {
    word: string;
    wordData: WordItem;
    onAnswer: (answer: boolean) => void;
}

export default function Card(props: CardProps) {
    return (
        <UserContext.Consumer>
            { (value: UserContextData) =>
                <CardWithContext context={value} {...props} />
            }
        </UserContext.Consumer>
    )
}

function CardWithContext(props: CardProps & { context: UserContextData }) {
    const { word, wordData, context, onAnswer } = props;
    const { mode } = context;

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

    const [cardTop, cardBottom] = (mode === Mode.SHOW_ORIGINAL) ?
        [word, wordData.translation] : [wordData.translation, word];

    return (
        <>
            <div className="row">
                <h1 className="caption">Do you remember this word? ({wordData.progress}%)</h1>
            </div>
            <div className="row">
                <Paper elevation={3} className="wordCard">
                    <span className="word">{ showTranslation ? cardBottom : cardTop }</span>
                </Paper>
            </div>
            { showTranslation ?  renderNextButton() : renderYesNoButtons() }
        </>
    )
}

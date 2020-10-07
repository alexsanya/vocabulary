import React, { useState } from 'react'
import _ from 'lodash';
import config from '../data/settings';
import Card from '../components/Card'
import { UserContext } from '../UserContext'
import { UserContextData, WordsList } from '../interfaces';
import './Training.css'
import { Redirect } from 'react-router-dom';

export default function Training() {
    return (
        <UserContext.Consumer>

            { (value: UserContextData) => {
                console.log('RENDER TRAINING >>>>>>>>>>>>>>>>>>>>>>', value);
                return value.userData ? (
                <TrainingWithContext context={value}/>
            ) : (<Redirect to='/' />)}}
        </UserContext.Consumer>
    )
}

function TrainingWithContext({ context }: {context: UserContextData}) {

    const getWordsScope = (words: WordsList, groupSize: number): Array<string> => {
        const fullTeachList = _.keys(words).filter(key => words[key].progress < 100);
        const sortedFullTeachList = fullTeachList.sort((key1, key2) => words[key2].progress - words[key1].progress);
        return _.dropRight(sortedFullTeachList, sortedFullTeachList.length - groupSize);
    }

    const [groupSize, setGroupSize] = useState(Math.min(config.groupSize, _.keys(context.words).length));

    const [actualIndex, setActualIndex] = useState(0);
    const [actualWords, setActualWords] = useState(getWordsScope(context.words, groupSize));

    const progressIncrement = Math.round(100 / config.triesBeforeCompletion);
    const currentWord = actualWords[actualIndex];

    const handleAnswer = (answer: boolean) => {
        if (answer) {
            const progress = Math.min(context.words[currentWord].progress + progressIncrement, 100);
            context.updateWord(currentWord, {
                ...context.words[currentWord],
                progress
            });
            const remainingWords = _.keys(context.words).filter(key => context.words[key].progress < 100);
            setGroupSize(Math.min(groupSize, remainingWords.length));
            setActualWords(getWordsScope(context.words, groupSize));
        } 
        setActualIndex((actualIndex + 1) % groupSize);
    }

    return (
        <Card word={currentWord} wordData={context.words[currentWord]} onAnswer={handleAnswer}></Card>
    )
}


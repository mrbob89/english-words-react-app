import React, { Component } from 'react';
import { Row } from 'antd';
import { FingerprintSpinner } from 'react-epic-spinners';
import { ReminderLabel, SaveButton, SpinnerWrapper, WordTag, WordsWrapper } from './styled';

import WordsBlockProvider from '../../data/providers/wordsBlockProvider';

class WordsBlock extends Component {
    static defaultProps = {
        savedWords: [],
        getSavedWordsLoader: true,
        saveWordsLoader: false,
        touchedWords: false,
        fetchSavedWords: () => false,
        removeWord: () => false,
        saveWords: () => false
    };

    componentDidMount() {
        const { fetchSavedWords } = this.props;

        fetchSavedWords();
    }

    handleRemoveWord = (word, event) => {
        event.preventDefault();
        const { removeWord } = this.props;

        removeWord(word);
    };

    handleSaveWords = () => {
        const { savedWords, saveWords } = this.props;

        saveWords(savedWords);
    };

    renderSavedWords = () => {
        const { savedWords } = this.props;

        return savedWords.map((word, i) => (
            <WordTag
                closable
                key={word}
                color={i % 2 ? 'geekblue' : 'red'}
                onClose={this.handleRemoveWord.bind(null, word)}
            >
                {word}
            </WordTag>
        ));
    };

    render() {
        const { getSavedWordsLoader, saveWordsLoader, touchedWords } = this.props;

        return (
            <div>
                <WordsWrapper>
                    {getSavedWordsLoader ? (
                        <SpinnerWrapper
                            type="flex"
                            justify="center"
                            align="middle"
                        >
                            <FingerprintSpinner color="#cf142b" />
                        </SpinnerWrapper>
                    ) : (
                        this.renderSavedWords()
                    )}
                </WordsWrapper>
                {touchedWords && (
                    <ReminderLabel>[ Words were updated! Don't forget to save the words to storage! ]</ReminderLabel>
                )}
                <Row type="flex" justify="center">
                    <SaveButton
                        size="large"
                        loading={saveWordsLoader}
                        onClick={this.handleSaveWords}
                    >
                        {saveWordsLoader ? 'Saving...' : 'Save to storage'}
                    </SaveButton>
                </Row>
            </div>
        );
    }
}

export default WordsBlockProvider(WordsBlock);

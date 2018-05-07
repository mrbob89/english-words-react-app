import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { fetchSavedWords, removeWord, saveWords } from '../actions';

const savedWordsSelector = ({ savedWords }) => savedWords;
const getSavedWordsLoaderSelector = ({ loading: { getSavedWords } }) => getSavedWords;
const saveWordsLoaderSelector = ({ loading: { saveWords } }) => saveWords;
const touchedWordsSelector = ({ touchedWords }) => touchedWords;

const select = createStructuredSelector({
    savedWords: savedWordsSelector,
    getSavedWordsLoader: getSavedWordsLoaderSelector,
    saveWordsLoader: saveWordsLoaderSelector,
    touchedWords: touchedWordsSelector
});

export default connect(select, { fetchSavedWords, removeWord, saveWords });

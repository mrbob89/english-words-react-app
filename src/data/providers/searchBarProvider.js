import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addWord, fetchData } from '../actions';

const searchedDataSelector = ({
    searchedData: { searchResults = [] } = {},
    savedWords = []
}) =>
    searchResults.map(item => ({
        id: shortid.generate(),
        word: item.word,
        saved: savedWords.includes(item.word)
    }));

const searchWordsLoaderSelector = ({ loading: { searchWords } }) => searchWords;

const select = createStructuredSelector({
    searchedData: searchedDataSelector,
    searchWordsLoader: searchWordsLoaderSelector
});

export default connect(select, { addWord, fetchData });

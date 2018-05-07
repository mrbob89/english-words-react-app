export const CHANGE_LOADING_INFO = 'GLOBAL@CHANGE_LOADING_INFO';
export const FETCH_DATA = 'SEARCH_BAR@FETCH_DATA';
export const FETCH_DATA_FULFILLED = 'SEARCH_BAR@FETCH_DATA_FULFILLED';
export const FETCH_SAVED_WORDS = 'WORDS_BOX@FETCH_SAVED_WORDS';
export const FETCH_SAVED_WORDS_FULFILLED =
    'WORDS_BOX@FETCH_SAVED_WORDS_FULFILLED';
export const ADD_WORD = 'WORDS_BOX@ADD_WORD';
export const REMOVE_WORD = 'WORDS_BOX@REMOVE_WORD';
export const SAVE_WORDS = 'WORDS_BOX@SAVE_WORDS';
export const TOUCHED_WORDS = 'WORDS_BOX@TOUCHED_WORDS';

export const changeLoadingInfo = (loadingKey, loading = true) => ({
    type: CHANGE_LOADING_INFO,
    loading,
    loadingKey
});

export const fetchData = query => ({
    type: FETCH_DATA,
    query
});

export const fetchDataFulfilled = data => ({
    type: FETCH_DATA_FULFILLED,
    data
});

export const fetchSavedWords = () => ({
    type: FETCH_SAVED_WORDS
});

export const fetchSavedWordsFulfilled = data => ({
    type: FETCH_SAVED_WORDS_FULFILLED,
    data
});

export const addWord = word => ({
    type: ADD_WORD,
    word
});

export const removeWord = word => ({
    type: REMOVE_WORD,
    word
});

export const saveWords = wordList => ({
    type: SAVE_WORDS,
    wordList
});

export const touchedWords = (touched = true) => ({
    type: TOUCHED_WORDS,
    touched
});

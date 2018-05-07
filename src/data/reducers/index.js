import {
    ADD_WORD,
    REMOVE_WORD,
    TOUCHED_WORDS,
    CHANGE_LOADING_INFO,
    FETCH_DATA_FULFILLED,
    FETCH_SAVED_WORDS_FULFILLED
} from '../actions';

const defaultState = {
    searchedData: [],
    savedWords: [],
    touchedWords: false,
    loading: {
        getSavedWords: true,
        searchWords: false,
        saveWords: false
    }
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_LOADING_INFO:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.loadingKey]: action.loading
                }
            };

        case FETCH_DATA_FULFILLED:
            return {
                ...state,
                searchedData: action.data
            };

        case FETCH_SAVED_WORDS_FULFILLED:
            return {
                ...state,
                savedWords: action.data
            };

        case ADD_WORD:
            return {
                ...state,
                savedWords: [action.word, ...state.savedWords]
            };

        case REMOVE_WORD:
            return {
                ...state,
                savedWords: [...state.savedWords.filter(w => w !== action.word)]
            };

        case TOUCHED_WORDS:
            return {
                ...state,
                touchedWords: action.touched
            };

        default:
            return state;
    }
};

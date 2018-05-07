import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { message, notification } from 'antd';
import http from '../../api';
import { API_URL, API_KEY, CLOUD_API_URL, CLOUD_API_KEY } from '../../config';
import {
    ADD_WORD,
    REMOVE_WORD,
    FETCH_DATA,
    FETCH_SAVED_WORDS,
    SAVE_WORDS,
    changeLoadingInfo,
    fetchDataFulfilled,
    fetchSavedWordsFulfilled,
    touchedWords
} from '../actions';

const CLOUD_CONFIG = {
    headers: {
        'secret-key': CLOUD_API_KEY
    }
};

export const fetchWordsEpic = action$ => {
    return action$
        .ofType(FETCH_DATA)
        .debounceTime(500)
        .distinctUntilKeyChanged('query')
        .filter(action => action.query)
        .switchMap(action =>
            Observable.concat(
                Observable.of(changeLoadingInfo('searchWords')).delay(500),
                http
                    .get(
                        `${API_URL}search/${
                            action.query
                        }?caseSensitive=false&skip=1&limit=15&api_key=${API_KEY}`
                    )
                    .retry(3)
                    .mergeMap(result => {
                        const { searchResults = [] } = result.response;

                        if (searchResults.length === 0) {
                            message.info("Words for such query weren't found!");
                        }

                        return [
                            fetchDataFulfilled(result.response),
                            changeLoadingInfo('searchWords', false)
                        ];
                    })
                    .catch(err => {
                        const { response: { message: msg } = {} } = err;

                        notification.error({
                            message: 'Server respond with error',
                            description:
                                msg || 'Searched words can not be loaded!'
                        });

                        return changeLoadingInfo('searchWords', false);
                    })
            )
        );
};

export const fetchSavedWords = action$ => {
    return action$.ofType(FETCH_SAVED_WORDS).mergeMap(action =>
        Observable.concat(
            Observable.of(changeLoadingInfo('getSavedWords')).delay(1000),
            http
                .get(`${CLOUD_API_URL}latest`, CLOUD_CONFIG)
                .retry(3)
                .mergeMap(result => {
                    const { data: { words = [] } = {} } = result.response;

                    if (words.length === 0) {
                        message.info('Saved words collection is empty!');
                    }

                    return [
                        fetchSavedWordsFulfilled(words),
                        changeLoadingInfo('getSavedWords', false)
                    ];
                })
                .catch(err => {
                    const saveWords = JSON.parse(
                        localStorage.getItem('savedWords')
                    );

                    if (saveWords.length !== 0) {
                        notification.warning({
                            message: 'Server respond with error',
                            description:
                                'Saved words were loaded from local storage'
                        });
                    } else {
                        notification.error({
                            message: 'Server respond with error',
                            description: 'Saved words can not be loaded!'
                        });
                    }

                    return Observable.of(fetchSavedWordsFulfilled(saveWords));
                })
        )
    );
};

export const saveWordsToStorageEpic = action$ => {
    return action$
        .ofType(SAVE_WORDS)
        .distinct(action => action.wordList[0])
        .switchMap(action => {
            localStorage.setItem('savedWords', JSON.stringify(action.wordList));

            const obj = {
                data: {
                    words: action.wordList
                }
            };

            return Observable.concat(
                Observable.of(changeLoadingInfo('saveWords')).delay(500),
                http
                    .put(CLOUD_API_URL, obj, CLOUD_CONFIG)
                    .retry(3)
                    .mergeMap(res => {
                        message.success('Words were successfully saved!');

                        return [
                            changeLoadingInfo('saveWords', false),
                            touchedWords(false)
                        ];
                    })
                    .catch(err => {
                        message.error(
                            "Words were't saved! Something went wrong!"
                        );

                        return changeLoadingInfo('saveWords', false);
                    })
            );
        });
};

export const touchedWordsEpic = (action$, store) => {
    return action$
        .ofType(ADD_WORD, REMOVE_WORD)
        .distinctUntilChanged(store.getState().touchedWords)
        .map(action => touchedWords());
};

export default combineEpics(
    fetchWordsEpic,
    fetchSavedWords,
    saveWordsToStorageEpic,
    touchedWordsEpic
);

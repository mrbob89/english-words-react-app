import React, { Component } from 'react';
import './App.css';

import SearchBar from './containers/SearchBar';
import WordsBlock from './containers/WordsBlock';

class App extends Component {
    render() {
        return (
            <div className="app">
                <div className="container">
                    <h1 className="headline">English <span>Words</span></h1>
                    <h2 className="subheadline" >[ find and save new words to learn ]</h2>
                    <SearchBar />
                    <WordsBlock />
                </div>
            </div>
        );
    }
}

export default App;

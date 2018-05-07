import React, { Component } from 'react';
import { Select } from 'antd';
import { SearchInput, SearchBarWrapper, StyledLoopingRhombusesSpinner } from './styled';
import SearchBarProvider from '../../data/providers/searchBarProvider';

const { Option } = Select;

class SearchBar extends Component {
    static defaultProps = {
        searchedData: [],
        searchWordsLoader: false,
        addWord: () => false,
        fetchData: () => false
    };

    state = {
        currentValue: ''
    };

    handleSearchWord = query => {
        const { fetchData } = this.props;

        this.setState(() => ({
            currentValue: query
        }));

        fetchData(query.toLowerCase());
    };

    handleSelectWord = word => {
        const { addWord } = this.props;

        if (!this.state.currentValue) {
            this.setState(() => ({
                currentValue: word
            }));
        }

        addWord(word);
    };

    renderSearchedResults = () => {
        const { searchedData } = this.props;

        return searchedData.map(item => (
            <Option key={item.id} value={item.word} disabled={item.saved}>
                {item.word + (item.saved ? ' (has already been added)' : '')}
            </Option>
        ));
    };

    render() {
        const { currentValue } = this.state;
        const { searchWordsLoader } = this.props;

        return (
            <SearchBarWrapper>
                {searchWordsLoader && (
                    <StyledLoopingRhombusesSpinner color="#cf142b" />
                )}
                <SearchInput
                    placeholder="Enter Word"
                    value={currentValue}
                    onSearch={this.handleSearchWord}
                    onSelect={this.handleSelectWord}
                >
                    {this.renderSearchedResults()}
                </SearchInput>
            </SearchBarWrapper>
        );
    }
}

export default SearchBarProvider(SearchBar);

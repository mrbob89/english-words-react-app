import styled from 'styled-components';
import { Select } from 'antd';
import { LoopingRhombusesSpinner } from 'react-epic-spinners';

export const SearchInput = styled(Select).attrs({
    mode: 'combobox',
    size: 'large',
    defaultActiveFirstOption: false,
    filterOption: false
})`
    width: 100%;
`;

export const StyledLoopingRhombusesSpinner = styled(LoopingRhombusesSpinner)``;
export const SearchBarWrapper = styled.div`
    position: relative;
    width: 80%;
    margin: 0 auto;

    ${StyledLoopingRhombusesSpinner} {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        z-index: 99;
    }
`;

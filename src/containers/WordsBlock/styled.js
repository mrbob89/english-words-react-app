import styled from 'styled-components';
import { Button, Row, Tag } from 'antd';

export const WordsWrapper = styled.div`
    position: relative;
    min-height: 50vh;
    width: 80%;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;

    &::after {
        display: block;
        content: 'Saved Words';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 30px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.1);
    }
`;

export const SpinnerWrapper = styled(Row)`
    min-height: 50vh;
`;

export const WordTag = styled(Tag)`
    position: relative;
    font-size: 18px !important;
    font-weight: 300;
    line-height: 23px !important;
    height: 28px !important;
    margin-bottom: 10px !important;
    z-index: 9;
`;

export const SaveButton = styled(Button)`
    background: #cf142b;
    color: #fff;

    &:hover {
        color: #00247d;
    }
`;

export const ReminderLabel = styled.p`
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    color: #fff;
    margin-bottom: 10px;
`;

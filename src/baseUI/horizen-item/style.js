import styled from 'styled-components';
import style from '../../assets/global-style';

const List = styled.div`
    display: inline-flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
    > span:nth-of-type(1) {
        flex: 0 0 auto;
        padding: 5px 0;
        margin-right: 5px;
        color: gray;
        font-size: ${style['font-size-m']};
    }
`;

const ListItem = styled.span`
    flex: 0 0 auto;
    padding: 5px 8px;
    font-size: ${style['font-size-m']};
    border-radius: 10px;
    &.selected {
        color: ${style['theme-color']};
        border: 1px solid ${style['theme-color']};
        opacity: .8;
    }
`;

export {
    List,
    ListItem,
}
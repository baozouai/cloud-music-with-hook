import styled from 'styled-components';
import style from '../../assets/global-style';

const NavContainer = styled.nav`
    white-space: nowrap;
    box-sizing: border-box;
    position: fixed;
    top: 95px;
    width: 100%;
    padding: 5px;
`;

const ListContainer = styled.div`
    position: fixed;
    top: 160px;
    left: 0;
    bottom: 0;
    width: 100%;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;

    .title {
        margin: 10px 0 10px 10px;
        color: ${style['font-color-desc']};
        font-size: ${style['font-size-s']};
    }
`;

const ListItem = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 0 5px;
    padding: 5px 0;
    border-bottom: 1px solid ${style['border-color']};
    .img_wrapper {
        margin-right: 20px;
        img {
            border-radius: 3px;
            width: 50px;
            height: 50px;
        }
    }
    .name {
        font-size: ${style['font-size-m']};
        color: ${style['font-color-desc']};
        font-weight: 500;
    }
`;

export {
    NavContainer,
    ListContainer,
    List,
    ListItem,
};
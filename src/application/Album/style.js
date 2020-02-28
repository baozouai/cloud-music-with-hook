import styled from 'styled-components';
import style from '../../assets/global-style';

const Container = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background-color: ${style['background-color']};
    transform-origin: right bottom;
    &.fly-enter, &.fly-appear {
        transform: rotateZ(30deg) translate3d(100%, 0, 0);
    }
    &.fly-enter-active, &.fly-enter-appear {
        transition: transform .3s;
        transform: rotateZ(0deg) translate3d(0, 0, 0);
    }
    &.fly-exit {
        transform: rotateZ(30deg) translate3d(0, 0, 0);
    }
    &.fly-exit-active {
        transition: transform .3s;
        transform: rotateZ(30deg) translate3d(100%, 0, 0);
    }
`;

export {
    Container,
}
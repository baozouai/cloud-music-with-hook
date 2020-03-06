import styled from 'styled-components';
import style from '../../assets/global-style';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: ${props => props.play > 0 ? '60px' : 0};
    width: 100%;
    z-index: 100;
    overflow: hidden;
    background-color: #f2f3f4;
    transform-origin: right bottom;
    &.fly-enter,
    &.fly-appear {
        transform: rotateZ('angle')(30) translate3d()(100%, 0, 0);
    }
    &.fly-enter-active,
    &.fly-apear-active {
        transform: rotateZ(0deg) translate3d(0, 0, 0);
    }
    &.fly-exit {
        transform: rotateZ('angle')(0) translate3d()(0, 0, 0);
    }
    &.fly-exit-active {
        transition: transform .3s;
        transform: rotateZ('angle')(30deg) translate3d()(100%, 0, 0);
    }
`;
const ImgWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 75%;
    transform-origin: top;
    background-image: url(${props => props.bgUrl});
    background-size: cover;
    z-index: 50;
    .filter {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba (7, 17, 27, 0.3);
    } 
`;
const CollectButton = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    width: 120px;
    height: 40px;
    line-height: 40px;
    margin-top: -55px;
    box-sizing: border-box;
    z-index: 50;
    background-color: ${style['theme-color']};
    color: ${style['font-color-light']};
    border-radius: 20px;
    text-align: center;
    font-size: 0;
    .icon-font {
        display: inline-block;
        font-size: 12px;
        margin-right: 10px;
        vertical-align: 1px;
    }
    .text {
        display: inline-block;
        font-size: 14px;
        letter-spacing: 5px;
    }
`;
const SongListWrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 50;
    > div {
        position: absolute;
        left: 0;
        width: 100%;
        overflow: visible;
    }
`;
const BgLayer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    z-index: 50;
`;
export {
    Container,
    ImgWrapper,
    SongListWrapper,
    BgLayer,
};
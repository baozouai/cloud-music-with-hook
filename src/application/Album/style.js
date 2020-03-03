import styled from 'styled-components';
import style from '../../assets/global-style';

const Container = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    overflow: scroll;
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

const TopDesc = styled.div`
    background-size: 100%;
    padding: 5px 10px;
    padding-bottom: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 275px;
    .background {
        z-index: -1;
        background-position: 0 0;
        background-size: 100% 100%;
        background: url(${props => props.background}) no-repeat;
        position: absolute;
        width: 100%;
        height: 100%;
        filter: blur(20px);
        .filter {
            position: absolute;
            z-index: 10;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background-color: rgba (7, 17, 27, 0.2);
        }
    }
    .img_wrapper {
        width: 120px;
        height: 120px;
        position: relative;
        .decorate {
            position: absolute;
            top: 0;
            width: 100%;
            height: 35px;
            border-radius: 3px;
            background-color: linear-gradient (hsla (0,0%,43%,.4),hsla (0,0%,100%,0));
        }
        .play_count {
            position: absolute;
            right: 2px;
            top: 2px;
            font-size: ${style['font-size-s']};
            color: ${style['font-color-light']};
            line-height: 15px;
            .play {
                vertical-align: top;
            }
        }
        img {
            width: 120px;
            height: 120px;
            border-radius: 3px;
        }
    }
    .desc_wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 120px;
        padding: 0 10px;
        .title {
            max-height: 70px;
            line-height: 1.5;
            font-weight: 700;
            color: ${style['font-color-light']};
            font-size: ${style['font-size-l']};

        }
        .person {
            display: flex;
            .avatar {
                width: 20px;
                height: 20px;
                margin-right: 5px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .name {
                line-height: 20px;
                font-size: ${style['font-size-m']};
                color: ${style['font-color-desc-v2']};
            }
        }
    }
`;

const Menu = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0 30px 20px 30px;
    margin-top: -100px;
    > div {
        display: flex;
        flex-direction: column;
        line-height: 20px;
        text-align: center;
        z-index: 1000;
        color: ${style['font-color-light']};
        font-size: ${style['font-size-s']};
        font-weight: 500;
        .iconfont {
            font-size: 20px;
        }
    }
`;

const SongList = styled.div`
    border-radius: 10px;
    opacity: .98;
    ${props => props.showBackground ? `background-color: ${style['highlight-background-color']}` : ''}
    .first_line {
        box-sizing: border-box;
        padding: 10px;
        padding-right: 0;
        position: relative;
        border-bottom: 1px solid ${style['border-color']};
        .play_all {
            display: inline-block;
            line-height: 24px;
            color: ${style['font-color-desc']};
            .iconfont {
                font-size: 24px;
                margin-right: 10px;
                vertical-align: top;
            }
            .sum {
                font-size: ${style['font-size-s']};
                color: ${style['font-color-desc-v2']};
            }
        }
        > span {
            vertical-align: top;
        }
        .add_list,
        .isCollected {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 130px;
            line-height: 34px;
            background-color: ${style['theme-color']};
            color: ${style['font-color-light']};
            font-size: 0;
            border-radius: 3px;
            vertical-align: top;
            .iconfont {
                vertical-align: top;
                font-size: 10px;
                margin: 0 5px 0 10px;
            }
            span {
                font-size: 14px;
                line-height: 34px;
            }
        }
        .isCollected {
            display: flex;
            background-color: ${style['background-color']};
            color: ${style['font-color-desc']};
        }
    }
`;

const SongItem = styled.ul`
    > li {
        display: flex;
        height: 60px;
        align-items: center;
        .index {
            flex-basis: 60px;
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
        }
        .info {
            box-sizing: border-box;
            flex: 1;
            display: flex;
            height: 100%;
            padding: 5px 0;
            flex-direction: column;
            justify-content: space-around;
            border-bottom: 1px solid ${style['border-color']};
            ${style.noWrap()}
            > span {
                ${style.noWrap()}
                &:nth-of-type(1) {
                    color: ${style['font-color-desc']};
                }
                &:nth-last-of-type(1){
                    font-size: ${style['font-size-s']};
                    color: #bba8a8;;
                }
            }
        }
    }
`;

export {
    Container,
    TopDesc,
    Menu,
    SongList,
    SongItem,
}
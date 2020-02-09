import styled, { keyframes } from 'styled-components';
import style from '../../assets/global-style';

const loading = keyframes`
    0%, 100% {
        transform: scale(0.0);
    }
    50% {
        transform: scale(1.0);
    }
`;

export const LoadingWrapper = styled.div`
    > div {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        z-index: 1000;
        opacity: .6;
        background-color: ${style['theme-color']};
        animation: ${loading} 1.4s infinite ease-in;

        &:nth-of-type(2) {
            animation-delay: -0.7s;
        } 
    }
`;
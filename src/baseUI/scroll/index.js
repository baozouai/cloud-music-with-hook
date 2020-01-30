import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, } from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import styled from 'styled-components';

const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const Scroll = forwardRef((props, ref) => {

    const [bScroll, setBScroll] = useState();
    const scrollContainerRef = useRef();

    const { scrollX, scrollY, click, refresh, top, bottom } = props;
    const { pullUp, pullDown, onScroll } = props;
    // 初始化scroll
    useEffect(() => {
        // current 指向初始化 bs 实例需要的 DOM 元素 
        const scroll = new BScroll(scrollContainerRef.current, {
            scrollX,
            scrollY,
            probeType: 3,
            click,
            bounce: {
                top,
                bottom,
            }
        });
        setBScroll(scroll);
        return () => setBScroll(null);
        // eslint-disable-next-line
    }, []);
    // 给实例绑定 scroll 事件
    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', scroll => onScroll(scroll));
        return () => bScroll.off('scroll');
    }, [bScroll, onScroll]);
    // 进行上拉到底的判断，调用上拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullUp) return;
        bScroll.on('scrollEnd', () => {
            // 判断是否滑到底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUp();
            }
        });
        return () => bScroll.off('scrollEnd');
    }, [bScroll, pullUp]);
    // 进行下拉的判断，调用下拉刷新的函数
    useEffect(() => {
        if (!bScroll || !pullDown) return;
        bScroll.on('touchEnd', pos => {
            // 判断用户下拉动作
            if (pos.y > 50) {
                pullDown();
            }
        });
        return () => bScroll.off('touchEnd');
    }, [bScroll, pullDown]);
    // 每次重新渲染都要刷新实例，防止无法滑动
    useEffect(() => {
        if (bScroll && refresh) bScroll.refresh();
    });
    // 给外界暴露方法
    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        getBScroll() {
            if (bScroll) return bScroll;
        }
    }));

    return (
        <ScrollContainer ref={scrollContainerRef}>
            {props.children}
        </ScrollContainer>
    )
});

Scroll.defaultProps = {
    scrollX: false,
    scrollY: true,
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    top: true,
    bottom: true,
};

Scroll.propTypes = {
    scrollX: PropTypes.bool, // 水平滚动的方向
    scrollY: PropTypes.bool, // 垂直滚动的方向
    click: PropTypes.bool, // 是否支持点击
    refresh: PropTypes.bool, // 是否刷新
    onScroll: PropTypes.func, // 滑动触发的回调函数
    pullUpLoading: PropTypes.bool, // 是否显示上拉loading动画
    pullDownLoading: PropTypes.bool, // 是否显示下拉loading动画
    pullUp: PropTypes.func, // 上拉加载逻辑
    pullDown: PropTypes.func, // 下拉加载逻辑
    // 是否支持向上吸顶
    top: PropTypes.bool,
    // 是否支持向下吸顶
    bottom: PropTypes.bool,
};

export default Scroll;
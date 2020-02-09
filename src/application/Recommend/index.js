import React, { useEffect, } from 'react';
import { connect } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import Scroll from '../../baseUI/scroll';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Loading from '../../baseUI/loading';
import { Content } from './style';
import * as actionCreators from './store/actionCreators';

function Recommend(props) {

    const { bannerList, recommendList, enterLoading, } = props;
    const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

    useEffect(() => {
        // 如果有数据的话，就避免再次请求
        // immutable数据结构的size为数据长度
        if (!bannerList.size) {
            getBannerDataDispatch();
        }
        if (!recommendList.size) {
            getRecommendListDataDispatch();
        }
        // eslint-disable-next-line
    }, [])
    // 转换为js数据结构
    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];
    return (
        <Content>
            <Scroll className="list" onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerListJS} />
                    <RecommendList recommendList={recommendListJS} />
                </div>
            </Scroll>
            {enterLoading ? <Loading /> : null}
        </Content>
    )
};
// 映射Redux的全局到props的state
const mapStateToProps = state => ({
    // 不要在这里将数据toJS
    // 不然每次diff比对props都是不一样的引用，还会导致不必要的渲染，属于滥用immutable
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn(['recommend', 'enterLoading']),
});
// 映射dispatch到props
const mapDispatchToProps = dispatch => ({
    // 获取轮播图
    getBannerDataDispatch() {
        actionCreators.getBannerList(dispatch);
    },
    // 获取推荐列表
    getRecommendListDataDispatch() {
        dispatch(actionCreators.getRecommendList());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
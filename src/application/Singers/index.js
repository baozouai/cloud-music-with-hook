import React, { useContext, useEffect, } from 'react';
import { connect } from 'react-redux';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { renderRoutes } from 'react-router-config';
import Horizen from '../../baseUI/horizen-item';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';
import { categoryTypes, alphaTypes } from '../../api/config';
import {
    changeEnterLoading,
    changePageCount,
    changePullDownLoading,
    changePullUpLoading,
    getHotSingerList,
    getMoreHotSingerList,
    getSingerList,
    getMoreSingerList,
    changeSingerList,
} from './store/actionCreators';
import { CategoryDataContext, CHANGE_CATEGORY, CHANGE_ALPHA, } from './data';
import { NavContainer, ListContainer, List, ListItem } from './style';

function Singers(props) {
    // const [category, setCategory] = useState('');
    // const [alpha, setAlpha] = useState('');
    const { data, dispatch } = useContext(CategoryDataContext);
    const { category, alpha } = data.toJS();
    const { singerList, enterLoading, pullUpLoading, pullDownLoading, } = props;
    const { getHotSingerListDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch, } = props;
    const singerListJS = singerList ? singerList.toJS() : [];
    const enterDetail = id => props.push(`/singers/${id}`);
    useEffect(() => {
        if (!singerList.size) {
            getHotSingerListDispatch();
        }
        // eslint-disable-next-line
    }, [])
    // 渲染歌手列表   
    const renderSingerList = () => {
        return (
            <List>
                {
                    singerListJS.map(item => (
                        <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
                            <div className="img_wrapper">
                                <LazyLoad placeholder={<img src={require('./singer.png')} height="100%" width="100%" alt="music" />}>
                                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                                </LazyLoad>
                            </div>
                            <span className="name">{item.name}</span>
                        </ListItem>
                    ))
                }
            </List>
        )
    }

    const handleUpdateCategory = category => {
        // setCategory(category);
        dispatch({ type: CHANGE_CATEGORY, data: category });
        updateDispatch(category, alpha);
    };
    const handleUpdateAlpha = alpha => {
        // setAlpha(alpha);
        dispatch({ type: CHANGE_ALPHA, data: alpha });
        updateDispatch(category, alpha)
    };
    // 上拉加载
    const handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, category === '', singerListJS.length - 1);
    }
    // 下拉加载
    const handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha);
    }
    // 滑动组件props
    const scrollProps = {
        pullUp: handlePullUp,
        pullDown: handlePullDown,
        pullUpLoading,
        pullDownLoading,
        onScroll: forceCheck,
    };
    return (
        <>
            <NavContainer>
                <Horizen
                    list={categoryTypes}
                    title="分类 (默认热门):"
                    selectedVal={category}
                    handleClick={val => handleUpdateCategory(val)}
                />
                <Horizen
                    list={alphaTypes}
                    title="首字母:"
                    selectedVal={alpha}
                    handleClick={val => handleUpdateAlpha(val)}
                />
            </NavContainer>
            <ListContainer>
                <Scroll {...scrollProps}>
                    {renderSingerList()}
                </Scroll>
                {enterLoading && <Loading />}
            </ListContainer>
            {renderRoutes(props.route.routes)}
        </>
    )
}

const mapStateToProps = state => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount']),
});

const mapDispatchToProps = dispatch => ({
    getHotSingerListDispatch() {
        dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
        dispatch(changeSingerList([]))
        dispatch(changePageCount(0)); // 改变了分类，使用页数置0
        dispatch(changeEnterLoading(true));
        dispatch(getSingerList(category, alpha));
    },
    pullUpRefreshDispatch(category, alpha, hot, pageCount) {
        dispatch(changePageCount(pageCount + 1));
        dispatch(changePullUpLoading(true));
        if (hot) {
            dispatch(getMoreHotSingerList());
        } else {
            dispatch(getMoreSingerList(category, alpha));
        }
    },
    // 下拉获取数据
    pullDownRefreshDispatch(category, alpha) {
        // 下拉则页数置0
        dispatch(changePageCount(0));
        dispatch(changePullDownLoading(true));
        if (category === '' && alpha === '') {
            dispatch(getHotSingerList())
        } else {
            dispatch(getSingerList(category, alpha));
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
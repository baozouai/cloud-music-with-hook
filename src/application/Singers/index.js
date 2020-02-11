import React, { useState, useEffect, } from 'react';
import { connect } from 'react-redux';
import Horizen from '../../baseUI/horizen-item';
import Scroll from '../../baseUI/scroll';
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
} from './store/actionCreators';
import { NavContainer, ListContainer, List, ListItem } from './style';

function Singers(props) {
    const [category, setCategory] = useState('');
    const [alpha, setAlpha] = useState('');
    const { singerList, enterLoading, pageCount, pullUpLoading, pullDownLoading, } = props;
    const { getHotSingerListDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch, } = props;
    const singerListJS = singerList? singerList.toJS(): [];
        useEffect(() => {
            getHotSingerListDispatch();

        }, [])
    // 渲染歌手列表   
    const renderSingerList = () => {
        return (
            <List>
                {
                    singerListJS.map(item => (
                        <ListItem key={item.id}>
                            <div className="img_wrapper">
                                <img src={item.picUrl} width="100%" height="100%" alt="music" />
                            </div>
                            <span className="name">{item.name}</span>
                        </ListItem>
                    ))
                }
            </List>
        )
    }

    const handleUpdateCategory = category => {
        setCategory(category);
        updateDispatch(category, alpha);
    };
    const handleUpdateAlpha = alpha => {
        setAlpha(alpha);
        updateDispatch(category, alpha)
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
                <Scroll>
                    {renderSingerList()}
                </Scroll>
            </ListContainer>
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
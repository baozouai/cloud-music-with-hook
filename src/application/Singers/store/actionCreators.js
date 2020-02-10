import { fromJS } from 'immutable';
import { getHotSingerListRequest, getSingerListRequest, } from '../../../api/request';
import {
    CHANGE_SINGER_LIST,
    CHANGE_PAGE_COUNT,
    CHANGE_ENTER_LOADING,
    CHANGE_PULLUP_LOADING,
    CHANGE_PULLDOWN_LOADING,
    CHANGE_CATEGORY,
    CHANGE_ALPHA,
} from './constants';

const changeSingerList = data => ({
    type: CHANGE_SINGER_LIST,
    data: fromJS(data),
});

const changePageCount = data => ({
    type: CHANGE_PAGE_COUNT,
    data,
});

const changeEnterLoading = data => ({
    type: CHANGE_ENTER_LOADING,
    data,
});

const changeCategory = data => ({
    type: CHANGE_CATEGORY,
    data,
});

const changeAlpha = data => ({
    type: CHANGE_ALPHA,
    data,
});

const changePullUpLoading = data => ({
    type: CHANGE_PULLUP_LOADING,
    data,
});

const changePullDownLoading = data => ({
    type: CHANGE_PULLDOWN_LOADING,
    data,
});

// 第一次加载热门歌手
const getHotSingerList = () => {
    return dispatch => {
        getHotSingerListRequest(0).then(res => {
            const { artists } = res;
            dispatch(changeSingerList(artists));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(() => {
            console.log('获取热门歌手失败');
        });
    }
};
// 加载更多热门歌手
const getMoreHotSingerList = () => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getHotSingerListRequest(pageCount).then(res => {
            const { artists } = res;
            const data = [...singerList, ...artists];
            dispatch(changeSingerList(data));
            dispatch(changeEnterLoading(false));
            dispatch(changePullUpLoading(false));
        }).catch(() => {
            console.log('获取更多热门歌手失败')
        });
    }
};
// 第一次加载对应类别歌手
const getSingerList = (category, alpha) => {
    return dispatch => {
        getSingerListRequest(category, alpha, 0).then(res => {
            const { artists } = res;
            dispatch(changeSingerList(artists));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(() => {
            console.log('加载歌手失败');
        });
    };
};
// 加载更多歌手
const getMoreSingerList = (category, alpha) => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']);
        getSingerListRequest(category, alpha, pageCount).then(res => {
            const { artists } = res;
            const data = [...singerList, ...artists];
            dispatch(changeSingerList(data));
            dispatch(changeEnterLoading(false));
            dispatch(changePullUpLoading(false));
        }).catch(() => {
            console.log('加载更多歌手失败');
        });
    };
};

export {
    changeSingerList,
    changeEnterLoading,
    changePageCount,
    changeCategory,
    changeAlpha,
    changePullDownLoading,
    changePullUpLoading,
    getHotSingerList,
    getMoreHotSingerList,
    getSingerList,
    getMoreSingerList,
};
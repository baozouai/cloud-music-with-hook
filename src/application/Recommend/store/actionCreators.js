import { fromJS } from 'immutable';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';
import * as actionTypes from './constants';

export const changeBannerList = data => ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data),
});

export const changeRecommendList = data => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data),
});

export const getBannerList = () => dispatch => {
    getBannerRequest().then(res => {
        const { banners } = res;
        dispatch(changeBannerList(banners));
    }).catch(() => {
        console.log('获取轮播图数据错误');
    });
};

export const getRecommendList = () => dispatch => {
    getRecommendListRequest().then(res => {
        const { result } = res;
        dispatch(changeRecommendList(result));
    }).catch(() => {
        console.log('推荐歌单数据传输错误');
    });
};
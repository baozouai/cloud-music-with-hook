import { fromJS } from 'immutable';
import * as actionTypes from './constants';

// fromJS把js数据结构转换为fromJS数据结构
const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
    enterLoading: true,
});

export default (state = defaultState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_BANNER:
            return state.set('bannerList', action.data);
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        default:
            return state;
    }
};
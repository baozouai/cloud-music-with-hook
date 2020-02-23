import { fromJS } from 'immutable';
import {
    CHANGE_SINGER_LIST,
    CHANGE_PAGE_COUNT,
    CHANGE_ENTER_LOADING,
    CHANGE_PULLUP_LOADING,
    CHANGE_PULLDOWN_LOADING,
} from './constants';

const initialState = fromJS({
    singerList: [],
    // 控制进场loading
    enterLoading: true,
    // 控制上拉加载动画
    pullUpLoading: false,
    // 控制下拉加载动画
    pullDownLoading: false,
    // 当前页数
    pageCount: 0,
});

export default (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_SINGER_LIST:
            return state.set('singerList', action.data);
        case CHANGE_PAGE_COUNT:
            return state.set('pageCount', action.data);
        case CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        case CHANGE_PULLUP_LOADING:
            return state.set('pullUpLoading', action.data);
        case CHANGE_PULLDOWN_LOADING:
            return state.set('pullDownLoading', action.data);
        default:
            return state;
    }
}
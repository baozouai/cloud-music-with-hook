import { fromJS } from 'immutable';
import { getRankListRequest } from '../../../api/request';

const CHANGE_RANK_LIST = 'home/rank/CHANGE_RANK_LIST';
const CHANGE_LOADINIG = 'home/rank/CHANGE_LOADINIG';

const changeRankList = data => ({
    type: CHANGE_RANK_LIST,
    data: fromJS(data),
});
const changeLoading = data => ({
    type: CHANGE_LOADINIG,
    data,
});

const getRankList = () => {
    return dispatch => {
        getRankListRequest().then(data => {
            const { list } = data;
            dispatch(changeRankList(list));
            dispatch(changeLoading(false));
        })
    }
};

// reducer部分
const defaultState = fromJS({
    rankList: [],
    loading: true,
});
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_RANK_LIST:
            return state.set('rankList', action.data);
        case CHANGE_LOADINIG:
            return state.set('loading', action.data);
        default:
            return state;
    }
};

export {
    CHANGE_RANK_LIST,
    CHANGE_LOADINIG,
    getRankList,
    reducer,
}



import { fromJS } from 'immutable';
import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from './constant';
import { getAlbumDetailRequest } from '../../../api/request';

const changeCurrentAlbum = data => ({
    type: CHANGE_CURRENT_ALBUM,
    data: fromJS(data),
});

const changeEnterLoading = data => ({
    type: CHANGE_ENTER_LOADING,
    data: data,
});

const getAlbumList = id => {
    return dispatch => {
        getAlbumDetailRequest(id).then(res => {
            const { playlist } = res;
            dispatch(changeCurrentAlbum(playlist));
            dispatch(changeEnterLoading(false));
        }).catch(() => console.log('获取album数据失败'))
    }
};

export {
    changeEnterLoading,
    getAlbumList,
};
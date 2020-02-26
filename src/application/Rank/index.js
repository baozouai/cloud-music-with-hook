import React, { useEffect, } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';
import { getRankList } from './store';
import { Container, List, ListItem, SongList, EnterLoading } from './style';

function Rank(props) {

    const { rankList: list, loading } = props;
    const { getRankListDataDispatch } = props;
    const rankList = list ? list.toJS() : [];
    // 官方榜单
    const officialList = rankList.filter(item => item.tracks.length);
    // 全球排行榜单
    const globalList = rankList.filter(item => !item.tracks.length);
    useEffect(() => {
        getRankListDataDispatch();
    }, []);
    // 渲染榜单函数 global是区分不同布局
    const renderRankList = (list, global) => {
        return (
            <List globalRank={global}>
                {
                    list.map(item => {
                        const { id, tracks, coverImgUrl, updateFrequency } = item;
                        return (
                            <ListItem key={item.id} tracks={tracks}>
                                <div className="img_wrapper">
                                    <img src={coverImgUrl} />
                                    <div className="decorate"></div>
                                    <span className="update_frequency">{updateFrequency}</span>
                                </div>
                                {renderSongList(tracks)}
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };
    // 官方版右侧歌曲列表
    const renderSongList = list => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
                    })
                }
            </SongList>
        ) : null;
    }
    const displayStyle = { display: loading ? 'none' : '' };
    return (
        <Container>
            <Scroll>
                <div>
                    <h1 className="official" style={displayStyle}>官方版</h1>
                    {renderRankList(officialList)}
                    <h1 className="global" style={displayStyle}>全球版</h1>
                    {renderRankList(globalList, true)}
                    {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
                </div>
            </Scroll>
            {renderRoutes(props.route.routes)}
        </Container>
    )
}

const mapStateToProps = state => ({
    rankList: state.getIn(['rank', 'rankList']),
    loadiing: state.getIn(['rank', 'loading']),
});

const mapDispatchToProps = dispatch => ({
    getRankListDataDispatch() {
        dispatch(getRankList());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
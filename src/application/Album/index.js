import React, { useState, useRef, memo, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import Header from '../../baseUI/header';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';
import { changeEnterLoading, getAlbumList } from './store/actionCreators';
import { getCount, getName, isEmptyObj } from '../../api/utils';
import { HEADER_HEIGHT } from '../../api/config';
import style from '../../assets/global-style';
import { Container, TopDesc, Menu, SongList, SongItem, } from './style';

function Album(props) {
    const { id } = props.match.params;
    const { currentAlbum: currentAlbumImmutable, enterLoading } = props;
    const { getAlbumDispatch } = props;

    useEffect(() => {
        getAlbumDispatch(id);
    }, [getAlbumDispatch, id]);
    const currentAlbum = currentAlbumImmutable.toJS();
    const [showStatus, setShowStatus] = useState(true);
    const [title, setTitle] = useState('歌单');
    // 是否跑马灯
    const [isMarquee, setIsMarquee] = useState(false);
    const headerEl = useRef();
    const cssTransitionProps = {
        in: showStatus,
        timeout: 300,
        classNames: 'fly',
        appear: true,
        unmountOnExit: true,
        onExited: props.history.goBack,
    };
    const handleBack = useCallback(() => {
        setShowStatus(false);
    }, []);
    const headerProps = {
        ref: headerEl,
        handleClick: handleBack,
        title,
        isMarquee,
    };
    const handleScroll = useCallback((pos) => {
        const minScrollY = -HEADER_HEIGHT;
        const percent = Math.abs(pos.y / minScrollY);
        const headerDom = headerEl.current;
        // 划过顶部的高度变化
        if (pos.y < minScrollY) {
            headerDom.style.backgroundColor = style['theme-color'];
            headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
            setTitle(currentAlbum.name);
            setIsMarquee(true)
        } else {
            headerDom.style.backgroundColor = '';
            headerDom.style.opacity = 1;
            setTitle('歌单');
            setIsMarquee(false);
        }
    }, [currentAlbum]);
    const renderTopDesc = () => {
        return (
            <TopDesc background={currentAlbum.coverImgUrl}>
                <div className="background">
                    <div className="filter" />
                </div>
                <div className="img_wrapper">
                    <div className="decorate" />
                    <img src={currentAlbum.coverImgUrl} alt="" />
                    <div className="play_count">
                        <i className="iconfont play">&#xe885;</i>
                        <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
                    </div>
                </div>
                <div className="desc_wrapper">
                    <div className="title">{currentAlbum.name}</div>
                    <div className="person">
                        <div className="avatar">
                            <img src={currentAlbum.creator.avatarUrl} alt="" />
                        </div>
                        <div className="name">{currentAlbum.creator.nickname}</div>
                    </div>
                </div>
            </TopDesc>
        );
    }
    const renderMenu = () => {
        return (
            <Menu>
                <div>
                    <i className="iconfont">&#xe6ad;</i>
                    评论
                                </div>
                <div>
                    <i className="iconfont">&#xe86f;</i>
                    点赞
                                </div>
                <div>
                    <i className="iconfont">&#xe62d;</i>
                    收藏
                                </div>
                <div>
                    <i className="iconfont">&#xe606;</i>
                    更多
                                </div>
            </Menu>
        );
    }
    const rendreSongList = () => {
        return (
            <SongList>
                <div className="first_line">
                    <div className="play_all">
                        <i className="iconfont">&#xe6e3;</i>
                        <span>播放全部<span className="sum">（共{currentAlbum.tracks.length}首）</span></span>
                    </div>
                    <div className="add_list">
                        <i className="iconfont">&#xe62d;</i>
                        <span>收藏({getCount(currentAlbum.subscribedCount)})</span>
                    </div>
                </div>
                <SongItem>
                    {
                        currentAlbum.tracks.map((item, index) => {
                            const { name, ar, al } = item;
                            return (
                                <li key={index}>
                                    <span className="index">{index + 1}</span>
                                    <div className="info">
                                        <span>{name}</span>
                                        <span>
                                            {getName(ar)} - {al.name}
                                        </span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </SongItem>
            </SongList>
        );
    }
    return (
        <CSSTransition {...cssTransitionProps}>
            <Container>
                <Header {...headerProps} />
                {
                    !isEmptyObj(currentAlbum) ?
                        (
                            <Scroll bounceTop={false} onScroll={handleScroll}>
                                <div>
                                    {renderTopDesc()}
                                    {renderMenu()}
                                    {rendreSongList()}
                                </div>
                            </Scroll>
                        ) : null
                }
                {enterLoading ? <Loading /> : null}
            </Container>
        </CSSTransition>
    )
}

const mapStateToProps = state => ({
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    enterLoading: state.getIn(['album', 'enterLoading']),
});
const mapDispatchToProps = dispatch => ({
    getAlbumDispatch(id) {
        dispatch(changeEnterLoading(true));
        dispatch(getAlbumList(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Album));
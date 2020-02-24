import React, { useState, useEffect, memo } from 'react';
import { PropTypes } from 'prop-types';
import Scroll from '../scroll';
import { List, ListItem } from './style';

function Horizen(props) {
    const { list, title, selectedVal } = props;
    const { handleClick } = props;

    return (
        <Scroll scrollX={true}>
                <List>
                    <span className="title">{title}</span>
                    {
                        list.map(item => {
                            const { key, name } = item;
                            return (
                                <ListItem
                                    key={key}
                                    className={`${selectedVal === key ? 'selected' : ''}`}
                                    onClick={() => handleClick(key)}
                                >
                                    {name}
                                </ListItem>
                            )
                        })
                    }
                </List>
        </Scroll>
    )
};

Horizen.defaultProps = {
    // 列表数据
    list: [],
    // 列表左边的标题
    title: '',
    // 选择的分类值
    selectedVal: '',
    // 点击不同分类的方法
    handleClick: null,
};

Horizen.propTypes = {
    list: PropTypes.array,
    title: PropTypes.string,
    selectedVal: PropTypes.string,
    handleClick: PropTypes.func,
};

export default memo(Horizen);
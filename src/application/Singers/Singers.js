import React, { useState } from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from './style';

function Singers() {
    const [ category, setCategory ] = useState('');
    const [ alpha, setAlpha ] = useState('');

    const handleUpdateCategory = val => setCategory(val);
    const handleUpdateAlpha = val => setAlpha(val);
    return (
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
    )
}

export default React.memo(Singers);
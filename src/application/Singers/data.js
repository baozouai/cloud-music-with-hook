import React, { createContext, useReducer } from 'react';
import { fromJS } from 'immutable';

const CategoryDataContext = createContext({});
const CHANGE_CATEGORY = 'singer/CHANGE_CATEGORY';
const CHANGE_ALPHA = 'singer/CHANGE_ALPHA';

const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_CATEGORY:
            return state.set('category', action.data);
        case CHANGE_ALPHA:
            return state.set('alpha', action.data);
        default:
            return state;
    }
}

// Provider组件
export default function Data(props) {
    // useReducer第二个参数传入初始值
    const [data, dispatch] = useReducer(reducer, fromJS({
        category: '',
        alpha: '',
    }));
    return (
        <CategoryDataContext.Provider value={{ data, dispatch }}>
            {props.children}
        </CategoryDataContext.Provider>
    )
}

export {
    CategoryDataContext,
    CHANGE_CATEGORY,
    CHANGE_ALPHA,
}

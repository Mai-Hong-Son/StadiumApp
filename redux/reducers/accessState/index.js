import { LOGIN_TYPES } from './../../constants';

const defaultState = {
    isLogin: false
}

export const checkLogin = (state = defaultState,action) => {
    switch (action.type) {
        case LOGIN_TYPES.LOGIN_SUCCESS:
            return { isLogin: !state.isLogin };
        case LOGIN_TYPES.LOGIN_ERROR:
            return state;
    }
    return state;
}
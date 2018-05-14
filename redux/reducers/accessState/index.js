import { LOGIN_TYPES } from './../../constants';

const defaultState = {
    userId: "",
    isLogin: false
}

export const checkLogin = (state = defaultState,action) => {
    switch (action.type) {
        case LOGIN_TYPES.LOGIN_SUCCESS:
            return { isLogin: !state.isLogin, userId: action.payload };
        case LOGIN_TYPES.LOGIN_ERROR:
            return state;
        case LOGIN_TYPES.LOGOUT_SUCCESS:
            return { isLogin: !state.isLogin, userId: "" };
        case LOGIN_TYPES.LOGOUT_ERROR:
            return state;
    }
    return state;
}
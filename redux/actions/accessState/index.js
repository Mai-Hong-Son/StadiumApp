import { LOGIN_TYPES } from './../../constants';

function loginSuccess() {
    return {
        type: LOGIN_TYPES.LOGIN_SUCCESS
    }
}

function loginError() {
    return {
        type: LOGIN_TYPES.LOGIN_ERROR
    }
}

export function checkLogin() {
    return dispatch => {
        try{
            dispatch(loginSuccess());
        }
        catch(err) {
            dispatch(loginError());
        }
    }
}
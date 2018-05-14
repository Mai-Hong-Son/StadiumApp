import { LOGIN_TYPES } from './../../constants';

function loginSuccess(userId) {
    return {
        type: LOGIN_TYPES.LOGIN_SUCCESS,
        payload: userId
    }
}

function loginError() {
    return {
        type: LOGIN_TYPES.LOGIN_ERROR
    }
}

function logoutSuccess() {
    return {
        type: LOGIN_TYPES.LOGOUT_SUCCESS
    }
}

function logoutError() {
    return {
        type: LOGIN_TYPES.LOGOUT_ERROR
    }
}

export function checkLogin(userId) {
    return dispatch => {
        try{
            dispatch(loginSuccess(userId));
        }
        catch(err) {
            dispatch(loginError());
        }
    }
}

export function checkLogout() {
    return dispatch => {
        try{
            dispatch(logoutSuccess());
        }
        catch(err) {
            dispatch(logoutError());
        }
    }
}
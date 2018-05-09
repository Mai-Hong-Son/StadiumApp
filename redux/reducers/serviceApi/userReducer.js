import _ from 'lodash';

const DEFAULT_STATES = { token_id: "", status: false }
const DEFAULT_USERS = { data: [], status: false }

export const user_tokenId = (state = DEFAULT_STATES, action) => {
    if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'CREATE_USER')) {
        return {...state};
    }
    if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'CREATE_USER')) {
        return { ...state, status: true };
    }
    return state;
}

export const allUser = (state = DEFAULT_USERS, action) => {
    if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_ALL_USER')) {
        return {...state};
    }
    if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_ALL_USER')) {
        return { ...state, data: action.payload.data, status: true };
    }
    return state;
}
    
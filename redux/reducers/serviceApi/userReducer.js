import _ from 'lodash';

const DEFAULT_STATES = { token_id: "", status: false }

export const user_tokenId = (state = DEFAULT_STATES, action) => {
    if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'CREATE_USER')) {
        return {...state};
    }
    if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'CREATE_USER')) {
        return { ...state, status: true };
    }
    return state;
}
    
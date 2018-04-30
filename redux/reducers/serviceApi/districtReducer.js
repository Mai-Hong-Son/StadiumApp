import _ from 'lodash';

const DEFAULT_STATES = { data: [], status: false }

export const districts = (state = DEFAULT_STATES, action) => {
    if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_ALL_DISTRICT')) {
        return {...state};
    }
    if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_ALL_DISTRICT')) {
        return { ...state, data: action.payload.data, status: true };
    }
    return state;
}
    
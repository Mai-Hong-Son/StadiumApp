import _ from 'lodash';

const DEFAULT_STATES = { data: [], status: false }

export const reservations = (state = DEFAULT_STATES, action) => {
    if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_ALL_RESERVATION')) {
        return {...state};
    }
    if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_ALL_RESERVATION')) {
        return { ...state, data: action.payload.data, status: true };
    }
    return state;
}
    
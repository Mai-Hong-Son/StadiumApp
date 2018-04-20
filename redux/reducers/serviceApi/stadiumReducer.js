import _ from 'lodash';

const DEFAULT_STATES = { payload: [], status: false }

export const stadiums = (state = DEFAULT_STATES, action) => {
        if (_.endsWith(action.type, ':ERROR')) {
            return {...state};
        }
        if (_.endsWith(action.type, ':SUCCESS')) {
            return { ...state, payload: action.payload, status: true };
        }
        return state;
}
    
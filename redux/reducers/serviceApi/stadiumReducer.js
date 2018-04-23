import _ from 'lodash';

const DEFAULT_STATES = { data: [], status: false, loading: true }

export const stadiums = (state = DEFAULT_STATES, action) => {
        if (_.endsWith(action.type, ':ERROR')) {
            return {...state};
        }
        if (_.endsWith(action.type, ':SUCCESS')) {
            return { ...state, data: [...state.data,...action.payload.data], status: true, loading: false };
        }
        return state;
}
    
import _ from 'lodash';

const DEFAULT_STATES = { data: [], status: false, loading: true, stadiumId: '' }

export const sessions = (state = DEFAULT_STATES, action) => {
    if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_ALL_SESSIONS')) {
        return {...state};
    }
    if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_ALL_SESSIONS')) {
        if( state.stadiumId !== action.payload.config.params.stadiumId) {
            state.data = []
        }
        
        return { ...state, data: [...state.data, action.payload.data], status: true, loading: false, stadiumId: action.payload.config.params.stadiumId };
    }
    return state;
}
    
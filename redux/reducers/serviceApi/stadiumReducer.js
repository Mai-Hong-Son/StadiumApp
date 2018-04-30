import _ from 'lodash';

const DEFAULT_STATES = { data: [], status: false, loading: true }

export const stadiums = (state = DEFAULT_STATES, action) => {
    if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_ALL_STADIUM')) {
        return {...state};
    }
    if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_ALL_STADIUM')) {
        if(action.payload.config.params.page === 1) {
            state.data = []
        }
        return { ...state, data: [...state.data,...action.payload.data], status: true, loading: false };
    }
    return state;
}

export const stadiumsByDistrict = (state = DEFAULT_STATES, action) => {
    if (_.endsWith(action.type, ':ERROR') && _.startsWith(action.type, 'GET_ALL_STADIUM_BY_DISTRICT')) {
        return {...state};
    }
    if (_.endsWith(action.type, ':SUCCESS') && _.startsWith(action.type, 'GET_ALL_STADIUM_BY_DISTRICT')) {
        if(action.payload.config.params.page === 1) {
            state.data = []
        }
        return { ...state, data: [...state.data,...action.payload.data], status: true, loading: false };
    }
    return state;
}
    
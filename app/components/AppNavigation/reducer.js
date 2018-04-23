import MainStack from './MainStack/index'

const initialState = MainStack.router.getStateForAction(MainStack.router.getActionForPathAndParams('Login'));

export const navReducer = (state = initialState, action) => {
    const nextState = MainStack.router.getStateForAction(action, state);
  
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};
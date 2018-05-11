import MainStack, { RootStacks } from './MainStack/index';
import RoutersMiddleware from '../Reusables/RoutersMiddleware';

const initialState = MainStack.router.getStateForAction(MainStack.router.getActionForPathAndParams('Login'));

export const navReducer = (state = initialState, action) => {
    // console.warn(action)
    const nextState = MainStack.router.getStateForAction(action, state);
  
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

export const mainRouter = (state, action) => {
    const duplicatedNavigate = RoutersMiddleware.duplicatedNavigate(action, 'mainRouter');
    if (duplicatedNavigate) return state;
  
    return RootStacks.router.getStateForAction(action, state) || state;
}
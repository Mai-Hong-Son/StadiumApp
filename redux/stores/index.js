import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import reduxThunk from 'redux-thunk';
import axiosMiddleware from './axiosMiddleware';

import { checkLogin, stadiums } from './../reducers/index';
import { navReducer } from './../../app/components/AppNavigation/reducer';

const config = {
  key: 'root',
  storage,
  blacklist: ['stadiums']
}

export default function buildStore() {
  const reducers = persistCombineReducers(config, {
    checkLogin,
    stadiums,
    navReducer
  });

  const store = createStore(
    reducers,
    compose(
      applyMiddleware(reduxThunk, axiosMiddleware),
    //   autoRehydrate({ log: FEATURES.REDUX_PERSIST_LOGGING }),
    )
  );

  const persistor = persistStore(store);
  
  return { persistor, store };
}
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import reduxThunk from 'redux-thunk';

import { checkLogin } from './../reducers/index';

const config = {
  key: 'root',
  storage,
}

export default function buildStore() {
  const reducers = persistCombineReducers(config, {
    checkLogin,
  });

  const store = createStore(
    reducers,
    compose(
      applyMiddleware(reduxThunk),
    //   autoRehydrate({ log: FEATURES.REDUX_PERSIST_LOGGING }),
    )
  );

  const persistor = persistStore(store);
  
  return { persistor, store };
}
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AppNavigation from './app/components/AppNavigation/index';
import buildStore from './redux/stores';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

const { persistor, store } = buildStore()

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
        persistor={persistor}>
          <AppNavigation/>
        </PersistGate>
      </Provider>
    );
  }
}

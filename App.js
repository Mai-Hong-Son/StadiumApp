/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import AppNavigation from './app/components/AppNavigation/index';
import Login from './app/components/Login/index';

export default class App extends Component {
  render() {
    return (
      <AppNavigation/>
    );
  }
}

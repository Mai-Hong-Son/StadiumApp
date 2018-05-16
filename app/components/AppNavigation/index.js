import React, { Component } from 'react';
import {
    addNavigationHelpers,
} from 'react-navigation';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import MainStack from './MainStack/index';

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
const addListener = createReduxBoundAddListener("root");

export default class AppNavigation extends React.Component {

    render() {
      return (
        <MainStack navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
        })} />
      );
    }
}

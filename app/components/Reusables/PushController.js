import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default class BookingSuccessView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
      PushNotification.configure({
        onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );
        },
      })
  }
  
  render() {
    return null;
  }
}

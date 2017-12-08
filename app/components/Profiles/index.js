import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class Profiles extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LoginButton
            publishPermissions={["publish_actions"]}/>
      </View>
    );
  }
}

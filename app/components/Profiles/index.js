import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Profiles extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ flex: 1, backgroundColor: '#32CD32', width: '100%'}}>
        </View>
        <View style={{ flex: 2 }}>
        </View>
      </View>
    );
  }
}

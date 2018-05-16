import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class Header extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
    <View style= {styles.containerHeader}>
      <Text style={{ fontSize: 16, color: '#ffffff', fontWeight: 'bold', marginTop: 10 }}>{'My Schedules'}</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: '#28a745',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: '100%'
    },
});

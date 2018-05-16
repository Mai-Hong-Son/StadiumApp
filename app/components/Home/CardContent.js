import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class CardContent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, color: '#000', fontWeight: 'bold' }}>{'P.BOOKER'}</Text>
        <Text style={{ fontSize: 20, marginTop: 15 }}>{'Ứng Dụng Đặt Lịch Sân Bóng'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#ffffff',
      height: '30%',
      width: '80%',
      marginTop: '-15%',
      borderRadius: 4,
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
});

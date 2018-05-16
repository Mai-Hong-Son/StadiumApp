import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
const backgroundStadium = require('./../../../assets/images/stadium.jpeg');

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <View>
          <Text style={{ color: '#ffffff', fontSize: 17}}>Welcome back <Text style={{color: 'pink', fontSize: 18, }}>Elnino</Text>!</Text>
        </View> */}
        <Image
        source={backgroundStadium}
        style={{ width: '100%', height: '100%'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      // backgroundColor: '#28a745',
      height: 230,
      width: '100%',
  },
});

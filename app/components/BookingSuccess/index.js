import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';

const statusImage = require('./../../../assets/images/Cute-Ball-Go-icon.png');

export default class BookingSuccessView extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: 80, height: 80 }} source={statusImage}/>
        <Text style={{ fontSize: 17, textAlign: 'center', color: '#D91283', marginTop: 10 }}>{'BOOKING SUCCESS!'}</Text>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={ () => this.props.navigateMainTab('MySessions') }>
        <View style={{ width: 150, height: 44, borderColor: '#D91283', borderWidth: 1, borderRadius: 4, justifyContent: 'center', backgroundColor: '#ffffff' }}>
            <Text style={{ fontSize: 15, textAlign: 'center', color: '#D91283' }}>{'OK'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEFA'
  },
});

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AppState
} from 'react-native';
import _ from 'lodash';
import PushNotification from 'react-native-push-notification';
// import PushController from './../Reusables/PushController';

const statusImage = require('./../../../assets/images/Cute-Ball-Go-icon.png');

export default class BookingSuccessView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount(){
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (appState) => {
    const { state: { params: { stadiumName } } } = this.props.navigation;

    if( appState === 'background' ) {
      var date = new Date(Date.now() + (10 * 1000));

      PushNotification.localNotificationSchedule({
        title: "Thông báo",
        message: `Bạn vừa đặt 1 sân ở ${stadiumName}. Đến đúng giờ nhé! ^_^`,
        date,
      });
    }
  }

  onSuccess = () => {
    this.props.navigateMainTab('MySessions');
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: 80, height: 80 }} source={statusImage}/>
        <Text style={{ fontSize: 17, textAlign: 'center', color: '#D91283', marginTop: 10 }}>{'ĐẶT SÂN THÀNH CÔNG!'}</Text>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={this.onSuccess}>
        <View style={{ width: 150, height: 44, borderColor: '#D91283', borderWidth: 1, borderRadius: 4, justifyContent: 'center', backgroundColor: '#ffffff' }}>
            <Text style={{ fontSize: 15, textAlign: 'center', color: '#D91283' }}>{'OK'}</Text>
          </View>
        </TouchableOpacity>
        {/* <PushController/> */}
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

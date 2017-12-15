import React, { Component } from 'react';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { View, Text, BackHandler, Image } from 'react-native';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import OneSignal from 'react-native-onesignal';

const backgroundStadium = require('./../../../assets/images/backgroundStadium.jpg');

const tracker = new GoogleAnalyticsTracker('UA-109683925-2');

export default class LoginView extends Component {
  constructor(props){
    super(props);

    this.state={
      userId: null,
    }

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    if(this.props.isLogin === true) {
      this.props.navigation.navigate('HomeStack');
    }
  }

  componentWillReceiveProps(nextProps){
    console.warn(nextProps);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    OneSignal.addEventListener('received', this.onReceived.bind(this));
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    OneSignal.removeEventListener('received', this.onReceived.bind(this));
    // OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds.bind(this));
  }

  onReceived(notification) {
    console.warn("Notification received: ", notification.displayType);
  }

  // onOpened(openResult) {
  //   console.warn('Message: ', openResult.notification.payload.body);
  //   console.warn('Data: ', openResult.notification.payload.additionalData);
  //   console.warn('isActive: ', openResult.notification.isAppInFocus);
  //   console.warn('openResult: ', openResult);
  // }

  // onRegistered(notifData) {
  //   console.warn("Device had been registered for push notifications!", notifData);
  // }

  onIds(device) {
    this.setState({
      userId: device.userId
    });
  }

  handleBackButtonClick() {
    if(this.props.navigation.state.routeName === 'Login' || this.props.navigation.state.routeName === 'HomeStack')
    {
      BackHandler.exitApp();
      return true;
    }
    return false;
  }

  onLoginFinished = (error, result) => {
    tracker.trackEvent('ButtonClick', 'Login');
    OneSignal.sendTags({userId: this.state.userId});
    if (error) {
      alert("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          this.props.checkLogin();
          this.props.navigation.navigate('HomeStack');
        }
      )
    }
  }

  onLogoutFinished = () => {
    tracker.trackEvent('ButtonClick', 'Logout');
    this.props.checkLogin();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
        style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center'}}
        source={backgroundStadium}
        blurRadius={0.5} />
        <LoginButton
          style={{ width: '90%' , height: 30, position: 'absolute' }}
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => this.onLoginFinished(error, result)
          }
          onLogoutFinished={() => this.onLogoutFinished()}/>
      </View>
      
    );
  }
}
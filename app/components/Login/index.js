import React, { Component } from 'react';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { View, Text, BackHandler, Image, TouchableHighlight, StyleSheet} from 'react-native';
import OneSignal from 'react-native-onesignal';

const backgroundStadium = require('./../../../assets/images/backgroundStadium.jpg');

export default class LoginView extends Component {
  constructor(props){
    super(props);

    this.state={
      userId: null,
      userData: {}
    }

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.onLoginFb = this.onLoginFb.bind(this);
  }

  componentDidMount() {
    if(this.props.isLogin === true) {
      this.props.navigation.navigate('HomeStack');
    }
  }

  // componentWillReceiveProps(nextProps){
  //   console.warn(nextProps);
  // }

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

  initUser(token) {
    const { userData } = this.state;
    fetch('https://graph.facebook.com/v2.11/me?fields=email,name,picture,birthday,gender&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      userData.name = json.name;
      userData.userId = json.id;
      userData.tokenId = token;
      userData.avatar = json.picture.data.url;
      userData.gender = json.gender;
      userData.email = json.email;
      userData.birthday = json.birthday;
      userData.isActive = true

      this.props.navigation.navigate('HomeStack');
      this.props.checkLogin(userData.userId);
      this.props.createUser(userData)
    })
    .catch(() => {
      console.log('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  onLoginFb() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email','user_location','user_birthday']).then(
      result => {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data
            this.initUser(accessToken)
          })
        }
      },
      error => {
        alert('Login fail with error: ' + error);
      }
    );
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute'}}
        source={backgroundStadium}
        blurRadius={0.2} />
        
        <TouchableHighlight
        style = {styles.button}
        onPress = {this.onLoginFb}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {"ĐĂNG NHẬP VỚI FACEBOOK"}
          </Text>
        </TouchableHighlight>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#5249D5',
    width: '90%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center'
  }
})
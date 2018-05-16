import React, { Component } from 'react';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { View, Text, BackHandler, Image, TouchableHighlight, StyleSheet} from 'react-native';
import OneSignal from 'react-native-onesignal';
import LinearGradient from 'react-native-linear-gradient';

const ronaldoImage = require('./../../../assets/images/ronaldo.png');

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
    OneSignal.configure({});

    this.props.getAllUser();
    if(this.props.isLogin === true) {
      this.props.navigation.navigate('RootStack');
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    OneSignal.addEventListener('received', this.onReceived.bind(this));
    OneSignal.addEventListener('ids', this.onIds.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    OneSignal.removeEventListener('received', this.onReceived.bind(this));
    OneSignal.removeEventListener('ids', this.onIds.bind(this));
  }

  onReceived(notification) {
    console.warn("Notification received: ", notification.displayType);
  }

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
      userData.birthDay = json.birthday;
      userData.isActive = true

      this.props.navigation.navigate('RootStack');
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
        <LinearGradient
        colors={['#00ff00', '#28a745']}
        end={{ x: 1, y: 0.5 }}
        start={{ x: 0.0, y: 0.25 }}
        style={{ width: '100%',flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingBottom: 30, paddingTop: 50}}
        >
          <Text style={{backgroundColor: 'rgba(52, 52, 52, 0)', fontWeight: 'bold', fontSize: 30, fontStyle: 'italic', color: '#fff'}}>
            {'P.BOOKER'}
          </Text>

          <Image
          style={{
            width: '90%',
            height: 350}}
          source={ronaldoImage}/>

          <View style={{ height: 2, backgroundColor: '#6e6e6e', width: '90%'}} />

          <TouchableHighlight
          style = {styles.button}
          onPress = {this.onLoginFb}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            {"ĐĂNG NHẬP VỚI FACEBOOK"}
            </Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#5249D5',
    width: '90%',
    height: 44,
    borderRadius: 4,
    justifyContent: 'center'
  }
})
import React, { Component } from 'react';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { View, TouchableOpacity, Text, BackHandler } from 'react-native';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

const tracker = new GoogleAnalyticsTracker('UA-109683925-2');

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state={
      isLogin: false
    }

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if(this.props.navigation.state.routeName === 'Login' || this.props.navigation.state.routeName === 'HomeStack')
    {
      BackHandler.exitApp();
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LoginButton
            publishPermissions={["publish_actions"]}
            onLoginFinished={
              (error, result) => {
                tracker.trackEvent('ButtonClick', 'Login');
                if (error) {
                  alert("login has error: " + result.error);
                } else if (result.isCancelled) {
                  alert("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      this.setState({
                        isLogin: true
                      }, () => {
                        this.props.navigation.navigate('HomeStack');
                      });
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => {
              tracker.trackEvent('ButtonClick', 'Logout');
              this.setState({
                isLogin: false
              }, () => {
                this.props.navigation.navigate('Login');
              });
            }}/>
      </View>
    );
  }
}
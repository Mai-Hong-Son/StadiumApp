import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import _ from 'lodash';
import LoadingPlaceholder from './../Reusables/Loadings/LoadingPlaceholder';

export default class Profiles extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.getAllUser();
  }

  get userData() {
    const { userId } = this.props;
    const { data } = this.props.allUser;

    return _.filter(data, { userId: userId });
  }

  onLogout = () => {
    Alert.alert(
      'Confirm',
      'Want to sign out?',
      [
        {text: 'Yes', onPress: () => {
          this.props.checkLogout();
          this.props.navigation.navigate('Login');
        }},
        {text: 'No', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    );
  }

  render() {
    const btnLogout = (<View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity style={{width: '100%', alignItems: 'center', marginBottom: 20}} onPress={this.onLogout}>
                          <View style={{ height: 44, width: '90%', borderWidth: 2, borderColor: '#D91283', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{fontSize: 17, color: '#D91283', fontWeight: 'bold'}}>{'ĐĂNG XUẤT'}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>);

    if(_.isEmpty(this.userData)) return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LoadingPlaceholder visible={true} />
        {btnLogout}
      </View>
    );

    const { name, createdAt, userId } = this.userData[0];
    const header = (<View style={{ flex: 1, backgroundColor: '#28a745', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                      <View style={{width: 102, height: 102, borderRadius: 51, borderColor: 'red', borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{ width: 100, height: 100, borderRadius: 50 }}  source={{uri: `https://graph.facebook.com/${userId}/picture?type=large`}}/>
                      </View>
                      <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>{name}</Text>
                    </View>)

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {header}
        {btnLogout}
      </View>
    );
  }
}

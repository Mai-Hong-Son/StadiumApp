import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import CardContent from './CardContent';

export default class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Header />
        <CardContent />
        <View style={{ width: '80%', borderTopWidth: 2, borderTopColor: '#6e6e6e', marginTop: 30, paddingTop: 10 }}>
          <Text style={{ fontSize: 15 }}>{'Chia sẻ tới những người bạn của bạn:'}</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Icon style={{ marginLeft: 10}} name='logo-googleplus' size={60} color="red"  />
            <Icon style={{ marginLeft: 10}} name='logo-facebook' size={60} color="blue"  />
          </View>
          <Text style={{ fontSize: 14, color:'#6e6e6e' }}>{'Giới thiệu:'}</Text>
          <Text style={{ color: '#6e6e6e', fontSize: 13 }}>{'P.Booker là một ứng dụng tiện ích giúp người dùng có thể tìm kiếm, đặt các sân bóng trên các khu vực trong địa bàn thành phố Hà Nội.'}</Text>
          <Text style={{ fontSize: 14, color:'#6e6e6e' }}>{'Liên hệ chúng tôi:'}</Text>
          <Text style={{ color: '#6e6e6e', fontSize: 13 }}>{'Hotline: +84 168 2396 571'}</Text>
          <Text style={{ color: '#6e6e6e', fontSize: 13 }}>{'Email: mhongson95@gmail.com'}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
});

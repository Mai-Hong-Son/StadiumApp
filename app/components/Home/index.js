import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
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
        <Header />
        <CardContent />
        <View style={{ width: '80%', borderTopWidth: 2, borderTopColor: '#6e6e6e', marginTop: 30, paddingTop: 10 }}>
          <Text style={{ fontSize: 15 }}>{'Share us with your friends:'}</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Icon style={{ marginLeft: 10}} name='logo-googleplus' size={60} color="red"  />
            <Icon style={{ marginLeft: 10}} name='logo-facebook' size={60} color="blue"  />
          </View>
          <Text style={{ fontSize: 15 }}>{'Contact us:'}</Text>
          <Text>{'Manchester United Football Club is a professional football club based in Old Trafford, Greater Manchester, England, that competes in the Premier League, the top flight of English football.'}</Text>
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

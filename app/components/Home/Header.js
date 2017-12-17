import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <View>
          <Text style={{ color: '#ffffff', fontSize: 17}}>Welcome back <Text style={{color: 'pink', fontSize: 18, }}>Elnino</Text>!</Text>
        </View> */}
        <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6RaRKOK9cOcXyHb-XmmRZMRQcLWVEnfFX-4cF9eZpQgmmB8Bv' }}
        style={{ width: '100%', height: '100%'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      // backgroundColor: '#32CD32',
      height: 230,
      width: '100%',
  },
});

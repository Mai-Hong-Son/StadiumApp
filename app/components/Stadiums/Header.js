import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Header extends Component {
  render() {
    return (
    <View style= {styles.container}>
      <View style= {styles.stylefilter}>
        {/* <TouchableOpacity containerStyle={styles.Buttonfilter} onPress={() => null} >
          <View style= {styles.containerFilter}>
            <MaterialCommunityIcons color={'#32CD32'} name="filter-outline" size={25} style={styles.iconFilter} />
            <Text>aaaaa</Text>
          </View>
        </TouchableOpacity> */}
        <TextInput
        style={styles.containerFilter}
        underlineColorAndroid='transparent'
        placeholder='Search for stadiums'
        placeholderTextColor='#6e6e6e'/>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#32CD32',
        justifyContent: 'center',
        height: 90,
    },
    stylefilter: {
        flex: 1,
        justifyContent: 'center',
    },
    Buttonfilter: {
        flex: 1,
    },
    iconFilter: {
        flex:1,
        marginLeft: 10,
    },
    containerFilter: {
        flexDirection: 'row',
        width: 343,
        height: 44,
        borderRadius:4,
        borderWidth: 1,
        backgroundColor: '#E0FFFF',
        borderColor: 'gray',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 15,
        marginTop: 40,
        paddingTop: 5,
        paddingLeft: 10
    },
    textFilter: {
        flex:8,
        alignItems: 'flex-start',
        fontSize: 13,
        color: 'white',
        // marginLeft: 5,
        marginTop: 5,
    },
});

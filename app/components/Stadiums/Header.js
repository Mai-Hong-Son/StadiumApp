import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Header extends Component {
  render() {
    return (
    <View style= {styles.container}>
      <View style= {styles.stylefilter}>
        <TouchableOpacity containerStyle= {styles.Buttonfilter} onPress={() => null} >
          <View style= {styles.containerFilter}>
            <MaterialCommunityIcons color={'white'} name="filter-outline" size={25} style={styles.iconFilter} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#32CD32',
        justifyContent: 'center',
        height: 70,
    },
    stylefilter: {
        flex: 1,
    },
    Buttonfilter: {
        flex: 1,
        width: 343,
        height: 44,
        borderRadius:4,
        borderWidth: 1,
        backgroundColor: 'gray',
        borderColor: 'gray',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    iconFilter: {
        flex:1,
        marginLeft: 10,
    },
    containerFilter: {
        flexDirection: 'row',
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

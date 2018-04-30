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

import ModalDropdown from 'react-native-modal-dropdown';

export default class Header extends Component {
  constructor(props){
    super(props)

    this.state = {
      districtName: []
    }
  }

  componentDidMount() {
    const { data } = this.props.districts
    data.forEach(element => {
      this.state.districtName.push(element.name)
    });
  }

  render() {
    return (
    <View style= {styles.containerHeader}>
      <View style= {styles.stylefilter}>
        {/* <TouchableOpacity containerStyle={styles.Buttonfilter} onPress={() => this.props.openFilter()} >
          <View style= {styles.containerFilter}>
            <MaterialCommunityIcons color={'#32CD32'} name="filter-outline" size={25} style={styles.iconFilter} />
            <Text style= {styles.textFilter}>{'Lọc theo khu vực'}</Text>
          </View>
        </TouchableOpacity> */}
        <TextInput
        style={styles.containerFilter}
        underlineColorAndroid='transparent'
        placeholder='Search for stadiums'
        placeholderTextColor='#6e6e6e'/>

        <ModalDropdown
        style={styles.menuDropdown}
        dropdownStyle={{
          width: 129,
          borderRadius: 4,
        }}
        dropdownTextHighlightStyle={{
          color: '#32CD32'
        }}
        textStyle={{
          textAlign: 'center',
          color: '#FF1493'
        }}
        options={this.state.districtName}
        defaultValue={'Chọn khu vực...'}
        />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: '#32CD32',
        justifyContent: 'center',
        height: 130,
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
        marginBottom: 5,
        marginTop: 30,
        paddingTop: 8,
        paddingLeft: 10,
        opacity: 0.7
    },
    textFilter: {
        flex:8,
        alignItems: 'flex-start',
        fontSize: 13,
        color: 'black',
        // marginLeft: 5,
        marginTop: 5,
    },
    menuDropdown: {
      height: 30,
      width: 130,
      backgroundColor: '#E0FFFF',
      opacity: 0.7,
      alignSelf: 'flex-start',
      marginLeft: 16,
      borderRadius: 4,
      justifyContent: 'center',
      borderColor: 'gray',
      borderWidth: 1,
    }
});

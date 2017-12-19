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
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import _ from 'lodash';

export default class SessionDetail extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { state: { params: { session, stadium } } } = this.props.navigation;
    const { images, duration, startMoment: time, price } = session;
    const { name, short_address } = stadium[0];

    const startHour = moment(time, 'HH').format('HH:mm');
    const weekDay = _.capitalize(moment(time, 'DD').format('dddd'));
    const date =  moment(time, 'MM').format('MM/DD');

    return (
      <View style={styles.container}>
        <Image source={{ uri: images }} style={styles.thumbnail}/>
        <View style={{ width: '90%', marginTop: 15 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.info}>{short_address}</Text>
            <Text style={styles.info}>{'Price: ' + price + ' ' + 'VND'}</Text>
            <Text style={styles.info}>{'Contact: 01682396571'}</Text>
            <Text style={styles.info}>
                <Icon name='md-calendar' size={15} color="#6e6e6e"  /> { startHour + ' - ' + weekDay + '(' + date + ')' + '  '}
                <Icon name='md-clock' size={15} color="#6e6e6e"  /> {'Duration' + ' - ' + duration + ' min'}
            </Text>
            <Text style={styles.info}>{'Empty: (4/4)'}</Text>
            <TouchableOpacity onPress={ () => {
              Alert.alert(
                'Confirm',
                'Are you sure?',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel book!'), style: 'cancel'},
                  {text: 'OK', onPress: () => console.warn('Book success!')},
                ],
                { cancelable: false }
              )
            } }>
                <View
                style={{ width: '100%',
                height: 40,
                borderRadius: 4,
                backgroundColor: '#FF1493',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                    <Text style={{ color: '#ffffff' }}>
                        Book This Stadium
                    </Text>
                </View>
            </TouchableOpacity>
            {/* <View style={{ width: '100%', borderTopColor: '#6e6e6e', borderTopWidth: 2, marginTop: 15 }}>

            </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  thumbnail: {
    width: '100%', 
    height: '40%',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: -57
  },
  name: {
    color: '#292941',
    fontSize: 17,
  },
  info: {
    color: '#6e6e6e',

    // Extra
    marginTop: 8,
  },
});

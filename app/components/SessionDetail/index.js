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
import 'moment/locale/vi';
import _ from 'lodash';

export default class SessionDetailView extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getALlReservation();
  }

  get reservationData() {
    const { state: { params: { session } } } = this.props.navigation;
    const { reservations: { data } } = this.props;

    return _.filter(data, item => {
        return item.sessionId._id === session._id;
    });
  }

  onMoveSchedule = () => {
    const { state: { params: { session } } } = this.props.navigation;
    const { childStadiums } = session;

    if(this.reservationData.length===childStadiums.length) {
      Alert.alert(
          'Xác nhận',
          'Không còn sân trống! Hãy di chuyển đến sân khác!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
      )
    } else {
      this.props.navigation.navigate('Reservation', { session: session });
    }
  }

  render() {
    const { state: { params: { session, stadium } } } = this.props.navigation;
    const { duration, startedAt: time, price, childStadiums } = session;
    const { name, address, thumbnail } = stadium;

    const startHour = moment(time).format('HH:mm');
    const weekDay = _.capitalize(moment(time).locale('vi').format('dddd'));
    const date =  moment(time).format('MM/DD');

    return (
      <View style={styles.container}>
        <Image source={{ uri: thumbnail[0]===undefined?'':thumbnail[0].url }} style={styles.thumbnail}/>
        <View style={{ width: '90%', marginTop: 15 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.info}>{address}</Text>
            <Text style={styles.info}>{'Giá: ' + price + '.000 ' + 'VND'}</Text>
            <Text style={styles.info}>
              {`Sân trống: (${this.reservationData.length===undefined?0:childStadiums.length - this.reservationData.length}/${childStadiums.length})`}
            </Text>
            <Text style={styles.info}>{'Liên hệ: 01682396571'}</Text>
            <Text style={styles.info}>
                <Icon name='md-calendar' size={15} color="#6e6e6e"  /> { startHour + ' - ' + weekDay + '(' + date + ')' + '  '}
                <Icon name='md-clock' size={15} color="#6e6e6e"  /> {'Thời gian' + ' - ' + duration + ' min'}
            </Text>
            <TouchableOpacity onPress={this.onMoveSchedule}>
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
                        {'ĐẶT LỊCH'}
                    </Text>
                </View>
            </TouchableOpacity>
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
    marginTop: -65
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

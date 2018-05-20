import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Easing,
  TouchableOpacity,
  Alert
} from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import DataRow from './DataRow/index';

const COLORS = {  
    FACEBOOK:               '#3b5998',
    GOOGLE:                 '#dd4b39',
    STARS:                  '#ff9800',
    WEFIT:                  '#292941',
    
    ALL_6:                  '#666666',
    ALL_9:                  '#999999',
    ALL_C:                  '#cccccc',
    ALL_E:                  '#eeeeee',
    TRIPLE_6E:              '#6e6e6e',
    PINK:                   '#e82e81',
    PURPLE:                 '#83358b',
};

const currentDate = new Date();

export default class MySessionsView extends Component {

  constructor(props) {
    super(props);

    this.state={
      reservationData: []
    }

    this.timelineVisible = new Animated.Value(0);
  }

  componentDidMount(){
    this.props.getAllUser();
    this.props.getALlReservation();
  }

  compareDate = (curDate, dateFuture) => {
    if ( (curDate - dateFuture) >= 0 )
      return true;
    return false; 
  }

  componentWillReceiveProps(nextProps) {
    const { reservations: { data } } = nextProps;
    const { tabId, variant } = this.props;
  
    if(data.length !== 0 && this.userData.length !== 0) {
      this.setState({
        reservationData: _.filter(data, item => {
          const { sessionId: { startedAt } } = item;
          const dateFuture = new Date(startedAt).getTime();
          switch( tabId ) {
            case 'upcoming':
              return item.userId._id === this.userData[0]._id && this.compareDate(currentDate, dateFuture) === false;
            case 'past':
              return item.userId._id === this.userData[0]._id && this.compareDate(currentDate, dateFuture) === true;
            default:
              return false;
          }
          return item.userId._id === this.userData[0]._id;})
      });
      this.toggleTimeline(true);
    } else {
      this.setState({
        reservationData: []
      })
    }
  }

  get userData() {
    const { userId } = this.props;
    const { data } = this.props.allUser;

    return _.filter(data, { userId: userId });
  }

  toggleTimeline = showing => (
    Animated.timing(this.timelineVisible, {
        duration: 750,
        easing: Easing.quad,
        toValue: showing ? 1 : 0,
    }).start()
  );

  onDelete = (id) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn hủy lịch này!',
      [
        {text: 'Yes', onPress: () => {
          this.props.deleteReservation(id)
          this.setState({
            reservationData: _.remove(this.state.reservationData, item => {
              return item._id === id;
            })
          })
        }},
        {text: 'No', onPress: () => console.log('no')},
      ],
      { cancelable: false }
    )
  }

  renderItem = ({item}) => {
    const { tabId, variant } = this.props;

    return (
      <TouchableOpacity onPress={() => this.onDelete(item._id)}>
        <DataRow
        reservationData={item}
        tabId={tabId}
        />
      </TouchableOpacity>
    );
  };

  renderTimeline = () => {
      const left = this.timelineVisible.interpolate({
          inputRange: [0, 1],
          outputRange: [-2, 28],
      });
      const opacity = this.timelineVisible;

      return <Animated.View style={[styles.timelineGuide, { left, opacity }]} />;
  };

  render() {
    const { reservationData } = this.state;

    if(reservationData.length === 0) return (
      <View style={styles.container}>
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{color: '#6e6e6e', fontSize: 20}}>{'!'}</Text>
          <Text style={{color: '#6e6e6e', fontSize: 15}}>{'Chưa có lịch'}</Text>
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, width: '100%' }}>
          {this.renderTimeline()}
          <FlatList
              data={reservationData}
              renderItem={this.renderItem}
              keyExtractor={({ _id }) => _id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  timelineGuide: {
    backgroundColor: COLORS.ALL_C,
    bottom: 0,
    left: 28.5,
    position: 'absolute',
    top: 0,
    width: 2,
  },
});

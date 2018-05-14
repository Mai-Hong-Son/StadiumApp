import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Easing
} from 'react-native';
import Header from './Header';
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

  componentWillReceiveProps(nextProps) {
    const { reservations: { data } } = nextProps;
  
    if(data.length !== 0 && this.userData.length !== 0) {
      this.setState({
        reservationData: _.filter(data, item => {
          return item.userId._id === this.userData[0]._id;})
      });
      this.toggleTimeline(true);
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

  renderItem = ({item}) => {
      return (
          <DataRow
          reservationData={item}
          />
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
        <Header/>
      </View>
    );

    return (
      <View style={styles.container}>
        <Header/>
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

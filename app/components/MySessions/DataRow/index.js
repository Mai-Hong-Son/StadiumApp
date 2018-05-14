import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Timestamps from './Timestamps';
import DetailInfo from './DetailInfo';

export default class DataRow extends Component {
  render() {
    const { reservationData: { childStadiumId, sessionId } } = this.props;
    const { startedAt, duration } = sessionId;
    const { stadiumId, numberOfS} = childStadiumId

    return (
      <View style={styles.container}>
        <Icon name='md-football' size={30} color="#900"  />
        <View style={styles.content}>
          <Timestamps color={'black'} duration={duration} time={startedAt}/>
          <DetailInfo stadium={stadiumId} numberOfS={numberOfS}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        padding: 16,
    },
    
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 4,
    },
});

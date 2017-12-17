import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Timestamps from './Timestamps';
import DetailInfo from './DetailInfo';

export default class DataRow extends Component {
  render() {
    const { session, variant, stadium } = this.props;
    const { duration, startMoment } = session;

    return (
    <TouchableOpacity onPress={() => this.props.navigate('SessionDetail', { session: session, stadium: stadium })}>
      <View style={styles.container}>
        <Icon name='md-football' size={30} color="#900"  />
        <View style={styles.content}>
          <Timestamps color={'black'} duration={duration} time={startMoment} variant={variant} />
          <DetailInfo session={session} stadium={stadium} variant={variant} />
        </View>
      </View>
    </TouchableOpacity>
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

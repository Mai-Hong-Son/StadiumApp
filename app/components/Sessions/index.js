import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import SessionListView from './SessionListView/index';

const mySessions = require('../../../redux/fakeData/sessions');
const stadiums = require('../../../redux/fakeData/stadiums');

export default class Sessions extends Component {
    static navigationOptions = ({ navigation: { state: { params: { title } } } }) => ({
        title,
    });

    get sessionsData() {
        const { state: { params: { stadiumId } } } = this.props.navigation;
        const { result } = mySessions;
        return _.filter(result, { stadiumid: stadiumId });
    }

    get stadiumsData() {
        const { state: { params: { stadiumId } } } = this.props.navigation;
        const { result } = stadiums;
        return _.filter(result, { id: stadiumId });
    }

    onViewSchedules = () => {
        const { navigation: { navigate } } = this.props;
        navigate('Sessions');
    };

    render() {
        const { tabId, variant, navigation: { navigate } } = this.props;
        return (
        <View style={styles.container}>
            <SessionListView
            onViewSchedules={this.onViewSchedules}
            sessionsData={this.sessionsData}
            stadiumsData={this.stadiumsData}
            tabId={tabId}
            variant={variant}
            navigate={navigate}/>
        </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

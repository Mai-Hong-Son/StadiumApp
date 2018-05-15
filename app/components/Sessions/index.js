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
import LoadingPlaceholder from './../Reusables/Loadings/LoadingPlaceholder';

export default class SessionsView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          title: params.title
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { state: { params: { stadiumId } } } = this.props.navigation;
        const { dateId } = this.props;

        this.props.getAllStadium();
        this.props.getAllSession(stadiumId, dateId)
    }

    get sessionsData() {
        const { state: { params: { stadiumId } } } = this.props.navigation;
        const { sessions: { data }, tabId, variant } = this.props;
        switch (variant) {
            case 'Sessions': return data[tabId];
            default: return [];
        }
    }

    get stadiumsData() {
        const { state: { params: { stadiumId } } } = this.props.navigation;
        const { data } = this.props.allStadiums;

        return _.filter(data, { _id: stadiumId });
    }

    onViewSchedules = () => {
        const { navigation: { navigate } } = this.props;
        navigate('Sessions');
    };

    render() {
        const { tabId, variant, navigation: { navigate } } = this.props;

        if(this.stadiumsData.length === 0 || this.sessionsData === undefined)
            return <LoadingPlaceholder visible={true} />;

        return (
        <View style={styles.container}>
            <SessionListView
            onViewSchedules={this.onViewSchedules}
            sessionsData={this.sessionsData}
            stadiumsData={this.stadiumsData[0]}
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

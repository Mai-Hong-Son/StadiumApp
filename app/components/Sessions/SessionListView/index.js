import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Animated,
  FlatList,
  Easing
} from 'react-native';
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

export default class SessionListView extends Component {

    constructor(props) {
        super(props);

        this.timelineVisible = new Animated.Value(0);
    }

    componentDidMount() {
        const { sessionsData } = this.props;

        this.toggleTimeline(!_.isEmpty(sessionsData));
    }

    // componentDidUpdate(prevProps) {
    //     const { sessionsData } = this.props;

    //     this.toggleTimeline(!_.isEmpty(sessionsData));
    // }

    toggleTimeline = showing => (
        Animated.timing(this.timelineVisible, {
            duration: 750,
            easing: Easing.quad,
            toValue: showing ? 1 : 0,
        }).start()
    );

    renderItem = ({item}) => {
        const { tabId, variant, stadiumsData, navigate } = this.props;

        return (
            <DataRow
            session={item}
            stadium={stadiumsData}
            tabId={tabId}
            variant={variant}
            navigate={navigate}
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
        const { sessionsData, variant } = this.props;

        return (
        <View style={styles.container}>
            {this.renderTimeline()}
            <FlatList
            data={sessionsData}
            renderItem={this.renderItem}
            keyExtractor={({ _id }) => _id}
            />
        </View>
        );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
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

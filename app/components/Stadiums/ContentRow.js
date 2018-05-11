import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import StarRating from 'react-native-star-rating';
import _ from 'lodash';

export default class ContentRow extends Component {
    constructor(props) {
        super(props);

        this.state={
            ratingScore: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        const { item: { rates } } = nextProps;

        if(rates.length !== 0 || rates.length !== undefined) {
            _.map(rates, (item) => {
                this.setState({
                    ratingScore: (this.state.ratingScore + item.score)/rates.length
                })
            })
        }
    }

    render() {
        const { item: { name, address, thumbnail } } = this.props;

        return (
        <View style={styles.container}>
            <View style={styles.containerThumbnail}>
                <Image source={{ uri: thumbnail[0]===undefined?'':thumbnail[0].url }} style={styles.thumbnail} />
            </View >
            <View style={styles.description}>
                <View style={styles.contentContainer}>
                    <Text numberOfLines={2} style={styles.title}>{name}</Text>
                    <Text style={styles.auth}>{address}</Text>
                </View>
                <StarRating
                    disabled
                    maxStars={5}
                    rating={this.state.ratingScore}
                    starSize={18}
                    containerStyle={{ width: 100 }}
                    selectedStar={() => null}
                    fullStarColor='#FF9800'
                />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 142,
        flexDirection: 'row',
        borderBottomColor: '#95989a',
        borderBottomWidth: 1,
    },
    title: {
        color: 'black',
        fontSize: 17,
        alignSelf: 'flex-start',
    },
    containerThumbnail: {
        flex: 1,
        justifyContent: 'center',
    },
    thumbnail: {
        width: 80, 
        height: 110,
        borderRadius:4,
        alignContent: 'center',
        alignSelf: 'center',
    },
    description: {
        flex: 2,
        alignContent: 'center',
        alignSelf: 'center',
    },
    contentContainer: {
        height: 95,
        width: 200,
    },
    auth: {
        color: '#666',
        marginTop: 10,
        fontSize: 14,
    },
});

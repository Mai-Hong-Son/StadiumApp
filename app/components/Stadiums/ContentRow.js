import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

export default class ContentRow extends Component {

  render() {
    const { item: { name, address, images} } = this.props;
    return (
    <View style={styles.container}>
        <View style={styles.containerThumbnail}>
            <Image source={{ uri: images }} style={styles.thumbnail} />
        </View >
        <View style={styles.description}>
            <View style={styles.contentContainer}>
                <Text numberOfLines={2} style={styles.title}>{name}</Text>
                <Text style={styles.auth}>{address}</Text>
            </View>
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
        borderRadius:2,
        alignContent: 'center',
        alignSelf: 'center',
    },
    description: {
        flex: 2,
        alignContent: 'center',
        alignSelf: 'center',
    },
    contentContainer: {
        height: 110,
        width: 200, 
    },
    auth: {
        color: '#666',
        marginTop: 10,
        fontSize: 14,
    },
});

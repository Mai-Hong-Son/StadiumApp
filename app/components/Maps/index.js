import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';

export default class Maps extends Component {

  constructor(props) {
    super(props);

    this.state={
      initialRegion: {
        latitude: 21.036237,
        longitude: 105.790583,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: [
        {
          coordinate: {
            latitude: 21.029283,
            longitude: 105.803557,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          title: 'So 1',
          description: 'Test'
        }
      ]
    }
  }

  render() {

    const markerList = _.map(this.state.marker, marker => {
      <MapView.Marker
        coordinate={marker.coordinate}
        title={marker.title}
        description={marker.description}
      />
    })

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.initialRegion}
        >
          {markerList}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

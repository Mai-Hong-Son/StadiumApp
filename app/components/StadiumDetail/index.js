import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import _ from 'lodash';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const window = Dimensions.get('window');
const torressImage = require('./../../../assets/images/torress.png');

export default class StadiumDetailView extends Component {

  constructor(props) {
    super(props);

    this.state={
      initialRegion: {
        latitude: 21.036237,
        longitude: 105.790583,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker:{
        coordinate: {
          latitude: 21.029283,
          longitude: 105.803557,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        title: '',
      }
    }
  }

  componentDidMount() {
    const { state: { params: { stadiumId } } } = this.props.navigation;

    this.props.getAllStadium();
  }

  get stadiumsData() {
    const { state: { params: { stadiumId } } } = this.props.navigation;
    const { data } = this.props.allStadiums;

    return _.filter(data, { _id: stadiumId });
  }

  get ratingScore() {
    const { rates } = this.stadiumsData[0]
    var ratingScore = 0;

    if(rates.length !== 0 || rates.length !== undefined) {
      _.map(rates, (item) => {
          ratingScore = (ratingScore + item.score)/rates.length
      })
    }

    return ratingScore
  }

  render() {

    if(this.stadiumsData[0] === undefined) return null;

    const { name, address, rates, description, _id } = this.stadiumsData[0];
    const { marker } = this.state
    const markerList = (<Marker
      coordinate={marker.coordinate}
      title={marker.title}
      description={marker.description}
    />)

    return (
      <ParallaxScrollView
        keyboardShouldPersistTaps="always"
        maskColor="transparent"
        parallaxHeaderHeight={250}
        renderBackground={() => <Image source={{uri: this.stadiumsData[0].thumbnail[0].url,
        width: window.width,
        height: 250}}/>}>
          <View style={styles.container}>
            <View style={{ height: 150, width: '90%', alignItems: 'center', marginTop: 10, borderBottomColor: '#A9A9A9', borderBottomWidth: 2 }}>
              <View style={{ height:80, width: '100%', flexDirection: 'row' }}>
                <View style={{ width: 80, height: 80, borderRadius: 4, flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Image style={{ width: 80, height: 80 }} source={torressImage}/>
                </View>
                <View style={{ width: 80, width: 250, paddingTop: 5, paddingLeft: 5}}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.info}>{address}</Text>
                </View>
              </View>

              <TouchableOpacity style={{ width: '100%' }} onPress={ () => this.props.navigation.navigate('Sessions', { stadiumId: _id, title: name }) }>
                <View
                style={{ width: '100%',
                height: 40,
                borderRadius: 4,
                backgroundColor: '#FF1493',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                    <Text style={{ color: '#ffffff' }}>
                        {'GO TO SCHEDULE'}
                    </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 80, width: '90%', alignItems: 'flex-start', marginTop: 10, borderBottomColor: '#A9A9A9', borderBottomWidth: 2, paddingLeft: 10 }}>
              <View style={{ height: 50, width: 50, backgroundColor: '#8B008B', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#ffffff' }}>{this.ratingScore + '.0'}</Text>
              </View>
              <Text style={{ width: 50, textAlign: 'center', color: '#6e6e6e', fontSize: 12, marginTop: 5 }}>{rates.length + ' ' + 'Rating'}</Text>
            </View>

            <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 10, borderBottomColor: '#A9A9A9', borderBottomWidth: 2, paddingLeft: 10, paddingBottom: 15 }}>
              <Text style={styles.name}>{'Introduce'}</Text>
              <Text style={{ color: '#6e6e6e', fontSize: 12, marginTop: 5 }}>{description}</Text>
            </View>

            <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 10, borderBottomColor: '#A9A9A9', borderBottomWidth: 2, paddingLeft: 10, paddingBottom: 15 }}>
              <Text style={styles.name}>{'Location'}</Text>
              <Text style={{ color: '#6e6e6e', fontSize: 12, marginTop: 5 }}>{address}</Text>
              
                <View style={styles.wrapMap}>
                  <MapView
                    style={styles.map}
                    initialRegion={this.state.initialRegion}
                  >
                    {markerList}
                  </MapView>
                </View>
            </View>
          </View>
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    color: '#292941',
    fontSize: 17,
    fontWeight: 'bold'
  },
  info: {
    color: '#6e6e6e',

    // Extra
    marginTop: 8,
  },
  wrapMap: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

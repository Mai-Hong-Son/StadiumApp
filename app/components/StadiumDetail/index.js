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
import MapView, { Marker } from 'react-native-maps';
import LoadingPlaceholder from './../Reusables/Loadings/LoadingPlaceholder';

const window = Dimensions.get('window');
const torressImage = require('./../../../assets/images/torress.png');

export default class StadiumDetailView extends Component {

  constructor(props) {
    super(props);

    this.state={
      mapDelta:{
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      ratingScore: 0,
      countRating: 0
    }
  }

  componentDidMount() {
    const { state: { params: { stadiumId } } } = this.props.navigation;

    this.props.getAllStadium();
  }

  componentWillReceiveProps(nextProps) {
    const { state: { params: { stadiumId } } } = this.props.navigation;
    const { data } = nextProps.allStadiums;

    if(!_.isEmpty(_.filter(data, { _id: stadiumId }))) {
      const { rates } = _.filter(data, { _id: stadiumId })[0];

      if(!_.isEmpty(rates)) {
        this.setState({
          ratingScore: (this.ratingScore(rates)/rates.length).toFixed(1),
          countRating: rates.length
        })
      }
    }
  }

  get stadiumsData() {
    const { state: { params: { stadiumId } } } = this.props.navigation;
    const { data } = this.props.allStadiums;

    return _.filter(data, { _id: stadiumId });
  }

  ratingScore = (rates) => {
    var sum = 0;

    if(!_.isEmpty(rates)){
      _.map(rates, (item) => {
          sum = sum + item.score;
      })
    }

    return sum;
  }

  get locationStadium() {
    const { location } = this.stadiumsData[0];
    const { mapDelta } = this.state

    const coordinateTemp = {
      latitude: Number(location.latitude),
      longitude: Number(location.longtitude),
      latitudeDelta: mapDelta.latitudeDelta,
      longitudeDelta: mapDelta.longitudeDelta,
    }

    return coordinateTemp;
  }

  renderAmeninty = item => {
    const { name, _id } = item;

    return (
      <Text key={_id} style={styles.info}>{'- ' + name}</Text>
    );
  }

  render() {

    if(this.stadiumsData[0] === undefined) return <LoadingPlaceholder visible={true} />;

    const { name, address, rates, description, _id, location, amenitieIds,thumbnail } = this.stadiumsData[0];
    const amenities = _.map(amenitieIds, item => this.renderAmeninty(item));
    const markerAddress = (<Marker
      coordinate={this.locationStadium}
      title={name}
    />);

    return (
      <View style={{ flex: 1 }}>
        <ParallaxScrollView
          keyboardShouldPersistTaps="always"
          maskColor="transparent"
          parallaxHeaderHeight={250}
          renderBackground={() => <Image source={{uri: thumbnail[0]===undefined?'':thumbnail[0].url,
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
                  marginTop: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  }}>
                      <Text style={{ color: '#ffffff' }}>
                          {'ĐẾN CHỌN LỊCH'}
                      </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ height: 80, width: '90%', alignItems: 'flex-start', marginTop: 10, borderBottomColor: '#A9A9A9', borderBottomWidth: 2, paddingLeft: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Rating' ,{ stadiumId: _id })}>
                  <View style={{ height: 50, width: 50, backgroundColor: '#8B008B', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#ffffff' }}>{this.state.ratingScore}</Text>
                  </View>
                  </TouchableOpacity>
                <Text style={{ width: 100, color: '#6e6e6e', fontSize: 13, marginTop: 5 }}>{this.state.countRating + ' ' + 'Bình chọn'}</Text>
              </View>

              <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 10, borderBottomColor: '#A9A9A9', borderBottomWidth: 2, paddingLeft: 10, paddingBottom: 15 }}>
                <Text style={styles.name}>{'Giới thiệu'}</Text>
                <Text style={{ color: '#6e6e6e', fontSize: 13, marginTop: 5 }}>{description}</Text>
              </View>

              <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 10, borderBottomColor: '#A9A9A9', borderBottomWidth: 2, paddingLeft: 10, paddingBottom: 15 }}>
                <Text style={styles.name}>{'Dịch vụ'}</Text>   
                {amenities}           
              </View>

              <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 10, paddingLeft: 10, paddingBottom: 15 }}>
                <Text style={styles.name}>{'Vị trí'}</Text>
                <Text style={{ color: '#6e6e6e', fontSize: 13, marginTop: 5 }}>{address}</Text>
                
                  <View style={styles.wrapMap}>
                    <MapView
                      style={styles.map}
                      initialRegion={this.locationStadium}
                      zoomEnabled={true}
                      zoomControlEnabled={true}
                      minZoomLevel={0}
                      maxZoomLevel={20}
                      loadingEnabled={true}
                    >
                      {markerAddress}
                    </MapView>
                  </View>
              </View>

              
            </View>
        </ParallaxScrollView>
      </View>
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: 250
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonZoom: {
    width: 30,
    height: 30,
    backgroundColor: 'red'
  },
});

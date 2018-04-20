import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity
} from 'react-native';
import ContentRow from './ContentRow';
import Header from './Header';

const stadiums = require('../../../redux/fakeData/stadiums');

export default class StadiumView extends Component {

  componentDidMount(){
    this.props.getAllStadium()
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Sessions', { stadiumId: item.id }) }>
      <ContentRow image={stadiums.result[0].images} item={item}/>
    </TouchableOpacity>
  );

  render() {
    const { payload: { data } } = this.props.stadiums

    return (
      <View style={styles.container}>
        <Header/>
        <View style={styles.content}>
          <FlatList
            data={data}
            keyExtractor={({ _id }) => _id}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
  },
});

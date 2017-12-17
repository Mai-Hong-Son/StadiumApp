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

export default class Stadiums extends Component {

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Sessions', { stadiumId: item.id}) }>
      <ContentRow item={item} />
    </TouchableOpacity>
  );

  render() {
    const { result } = stadiums;
    return (
      <View style={styles.container}>
        <Header/>
        <View style={styles.content}>
          <FlatList
            data={result}
            keyExtractor={({ id }) => id}
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

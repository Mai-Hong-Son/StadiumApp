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
import LoadingPlaceholder from './../Reusables/Loadings/LoadingPlaceholder';
import _ from 'lodash';

const stadiums = require('../../../redux/fakeData/stadiums');

export default class StadiumView extends Component {

  constructor(props){
    super(props);

    this.state = {
      page: 1,
      perPage: 10,
      loadingFooter: false
    }

  }

  componentDidMount(){
    this.props.getAllStadium(this.state.page, this.state.perPage);
  }

  componentWillReceiveProps(nextProps) {
    const { page } = this.state

    if(page === 1){
      this.setState({
        loadingFooter: false
      })
    } else {
      this.setState({
        loadingFooter: true
      })
    }
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Sessions', { stadiumId: item.id }) }>
      <ContentRow image={stadiums.result[0].images} item={item}/>
    </TouchableOpacity>
  );

  onRefresh = () => {
    this.props.getAllStadium(1, this.state.perPage);
    this.setState({
      page: 1
    });
  }

  onEndReached = () => {
    this.props.getAllStadium(this.state.page + 1, this.state.perPage);
    this.setState({
      page: this.state.page + 1,
    });
  }

  render() {
    const { data } = this.props.stadiums
    const { loadingFooter } = this.state

    if (_.isEmpty(data)) return null;

    return (
      <View style={styles.container}>
        <Header/>
        <View style={styles.content}>
          <FlatList
            ListFooterComponent={() => <LoadingPlaceholder visible={loadingFooter} />}
            data={data}
            keyExtractor={({ _id }) => _id}
            onRefresh={this.onRefresh}
            refreshing={false}
            renderItem={this.renderItem}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0}
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

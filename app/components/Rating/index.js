import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import StarRating from 'react-native-star-rating';
import _ from 'lodash';

export default class RatingView extends Component {

  constructor(props) {
    super(props);

    this.state={
      starCount: 0
    }
  }

  componentDidMount(){
    this.props.getAllUser();
  }

  get userData() {
    const { state: { params: { stadiumId } } } = this.props.navigation;
    const { userId } = this.props;
    const { data } = this.props.allUser;

    return _.filter(data, { userId: userId });
  }

  render() {
    const { allUser: { data } } = this.props;
    const { state: { params: { stadiumId } } } = this.props.navigation;
    if( data.length === undefined || data.length === 0) return null;
    const { _id: userId } = this.userData[0];
    const { starCount: score } = this.state;

    return (
      <View style={styles.container}>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={this.state.starCount}
          starSize={25}
          containerStyle={{ width: 100 }}
          selectedStar={(rating) => {
            this.setState({
              starCount: rating
            });
          }}
          fullStarColor='#FF9800'
        />
        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => {
              const rating = {
                userId,
                stadiumId,
                score
              }
              this.props.createNewRating(rating);
              this.props.navigateMainTab('Home')
        }}>
          <View style={{ width: 150, height: 44, borderColor: '#D91283', borderWidth: 1, borderRadius: 4, justifyContent: 'center', backgroundColor: '#ffffff' }}>
            <Text style={{ fontSize: 15, textAlign: 'center', color: '#D91283' }}>{'RATING'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

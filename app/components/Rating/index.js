import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import StarRating from 'react-native-star-rating';
import _ from 'lodash';

const torresRatingImage = require('./../../../assets/images/torres-rating.png');

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
        <View style={{flex:1,width: '100%', alignItems: 'center', paddingTop: 15}}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            starSize={25}
            containerStyle={{ width: 150 }}
            selectedStar={(rating) => {
              this.setState({
                starCount: rating
              });
            }}
            fullStarColor='#FF9800'
          />
          <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
                const rating = {
                  userId,
                  stadiumId,
                  score
                }
                this.props.createNewRating(rating);
                Alert.alert(
                    'Xác nhận',
                    'Bình chọn thành công! Cảm ơn bạn!',
                    [
                      {text: 'OK', onPress: () => this.props.navigation.goBack()},
                    ],
                    { cancelable: false }
                )
          }}>
            <View style={{ width: 150, height: 44, borderColor: '#D91283', borderWidth: 1, borderRadius: 4, justifyContent: 'center', backgroundColor: '#ffffff' }}>
              <Text style={{ fontSize: 15, textAlign: 'center', color: '#D91283' }}>{'CHẤM ĐIỂM'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Image
          style={{
            width: '90%',
            flex: 5}}
          source={torresRatingImage}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
});

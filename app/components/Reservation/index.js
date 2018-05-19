import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import _ from 'lodash';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const bank_props = [
    {label: 'BIDV   ', value: 'BIDV' },
    {label: 'VIETINBANK', value: 'VietinBank' }
];

export default class ReservationView extends Component {

  constructor(props){
    super(props);

    this.state={
        bankName: bank_props[0].value,
        childStadiumId: this.childStadiumsData[0].value,
        bankNumber: '',
        checkClickBtnBook: false,
        textValidate: '',
    };
  }

  componentDidMount(){
    this.props.getAllUser();
    this.props.getALlReservation();
  }

  componentWillReceiveProps(nextProps) {
      const { isBook: { success } } = nextProps.statusBooking;
      const { checkClickBtnBook } = this.state;
      const { state: { params: { session: { stadiumId: { name } } } } } = this.props.navigation;
      
      if(success && checkClickBtnBook) {
        this.setState({
            checkClickBtnBook: false
          });
        this.props.navigation.navigate('BookingSuccess', { stadiumName: name });
      } else if(!success && checkClickBtnBook) {
        Alert.alert(
            'Xác nhận',
            'Đặt sân thất bại!',
            [
              {text: 'OK', onPress: () => this.props.navigateMainTab('HomeTab')},
            ],
            { cancelable: false }
        )
      }
  }

  get userData() {
    const { state: { params: { stadiumId } } } = this.props.navigation;
    const { userId } = this.props;
    const { data } = this.props.allUser;

    return _.filter(data, { userId: userId });
  }

  get reservationData() {
    const { state: { params: { session } } } = this.props.navigation;
    const { reservations: { data } } = this.props;

    return _.filter(data, item => {
        return item.sessionId._id === session._id;
    });
  }

  get childStadiumsData() {
    const { state: { params: { session } } } = this.props.navigation;
    const { childStadiums } = session;
    var listChild = [];

    _.map( childStadiums, item => {
        listChild.push({
            label: 'Sân ' + item.numberOfS + '      ',
            value: item._id
        });
    } );
    if( this.reservationData.length !== undefined || this.reservationData.length !== 0) {
        _.map(this.reservationData, item => {
            _.remove(listChild, o => {
                return o.value === item.childStadiumId._id;
            })
        });
    }

    return listChild;
  }

  onChangeText = (textChange) => {
    if(textChange !== '') {
        this.setState({
            bankNumber: textChange,
            textValidate: ''
        })
    } else {
        this.setState({
            textValidate: 'Chưa nhập số tài khoản!'
        })
    }
  }

  onReservation = () => {
    const { state: { params: { session } } } = this.props.navigation;

    const reservation = {
        userId: this.userData[0]._id,
        childStadiumId: this.state.childStadiumId,
        sessionId: session._id,
        bankNumber: this.state.bankNumber,
        bankName: this.state.bankName
    }

    if(this.state.bankNumber === '' || this.state.bankNumber.length <= 6) {
        this.setState({
            textValidate: 'Số tài khoản phải > 6 ký tự'
        });
    } else {
        this.props.createNewReservation(reservation);
        this.setState({
            checkClickBtnBook: true
        });
    }
  }

  render() {
    const { state: { params: { session: { price } } } } = this.props.navigation;

    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#28a745'}}>
        <View style={{ width: '90%', backgroundColor: '#ffffff', marginTop: 20, borderRadius: 4, padding: 10 }}>
            <Text>{'Chọn Sân:'}</Text>
            <RadioForm
                radio_props={this.childStadiumsData}
                // formHorizontal
                style={{ alignItems: 'flex-start', marginTop: 10 }}
                initial={0}
                buttonColor={'#D91283'}
                onPress={(value) => {this.setState({childStadiumId:value})}}
            />
        </View>

        <View style={{ width: '90%', backgroundColor: '#ffffff', marginTop: 10, borderRadius: 4, padding: 10 }}>
            <RadioForm
                radio_props={bank_props}
                formHorizontal
                initial={0}
                buttonColor={'#D91283'}
                onPress={(value) => {this.setState({bankName:value})}}
            />

            <TextInput
                style={{ height: 44, paddingLeft: 10, borderColor: '#6e6e6e', borderRadius: 4, borderWidth: 1, marginTop: 10 }}
                underlineColorAndroid='transparent'
                placeholder='Số tài khoản'
                placeholderTextColor='#6e6e6e'
                onChangeText={this.onChangeText}/>
            <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{this.state.textValidate}</Text>

            <Text style={{ color: '#292941', fontSize: 17, marginTop: 5 }}>{'Giá: ' + price + '.000'}</Text>
        </View>

        <TouchableOpacity style={{ marginTop: 15, width: '90%' }} onPress={this.onReservation}>
            <View
            style={{ height: 44, backgroundColor: '#ffffff', borderColor: '#D91283', borderWidth: 1, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#D91283', fontSize: 15, textAlign: 'center' }}>{'ĐẶT'}</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}

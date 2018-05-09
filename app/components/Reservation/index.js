import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity
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
    };
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

  get childStadiumsData() {
    const { state: { params: { session } } } = this.props.navigation;
    const { childStadiums } = session;
    var listChild = [];

    _.map( childStadiums, item => {
        listChild.push({
            label: 'Stadium ' + item.numberOfS,
            value: item._id
        })
    } );

    return listChild;
  }

  onReservation = (userId, childStadiumId, sessionId, bankNumber, bankName, payed) => {
    this.props.createNewReservation({userId, childStadiumId, sessionId, bankNumber, bankName, payed})
  }

  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#32CD32'}}>
        <View style={{ width: '90%', backgroundColor: '#ffffff', marginTop: 20, borderRadius: 4, padding: 10 }}>
            <Text>{'Choose Number Stadium:'}</Text>
            <RadioForm
                radio_props={this.childStadiumsData}
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
                placeholder='Bank account number'
                placeholderTextColor='#6e6e6e'/>

            <Text style={{ color: '#292941', fontSize: 17, marginTop: 10 }}>{'Price: '}</Text>
        </View>

        <TouchableOpacity style={{ marginTop: 15, width: '90%' }} onPress={() => null}>
            <View
            style={{ height: 44, backgroundColor: '#ffffff', borderColor: '#D91283', borderWidth: 1, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#D91283', fontSize: 15, textAlign: 'center' }}>{'CONFIRM'}</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}

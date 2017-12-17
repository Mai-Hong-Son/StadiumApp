/**
 * @providesModule WeFit.Components.SessionsListing.SessionsListView.DataRow.DetailInfo
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import _ from 'lodash';

export default function DetailInfo({ session, stadium, variant }) {
  const {
    is_reserved: reserved,
    price,
    name,
    reservationCode,
  } = session;

  const {
      name: stadiumName,
      short_address
  } = stadium[0]

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.info}>{stadiumName}</Text>
        <Text style={styles.info}>{short_address}</Text>
        <Text style={styles.infoPrice}>{price + ' ' + 'VNĐ'}</Text>
      </View>
      {/* <View style={{ width: '30%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <View style={{ width: '100%', height: 30, backgroundColor: 'red', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#ffffff' }}>{'BOOK'}</Text>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    color: '#292941',
    fontSize: 17,
  },
  info: {
    color: '#6e6e6e',

    // Extra
    marginTop: 8,
  },
  infoPrice: {
    color: 'red',
    fontSize: 15,
    marginTop: 8,
  },
});

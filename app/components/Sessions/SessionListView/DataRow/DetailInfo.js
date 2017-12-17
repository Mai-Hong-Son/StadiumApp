/**
 * @providesModule WeFit.Components.SessionsListing.SessionsListView.DataRow.DetailInfo
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
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
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.info}>{stadiumName}</Text>
        <Text style={styles.info}>{short_address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

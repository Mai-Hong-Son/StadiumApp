/**
 * @providesModule WeFit.Components.SessionsListing.SessionsListView.DataRow.DetailInfo
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import _ from 'lodash';

export default function DetailInfo({ stadium, numberOfS }) {
  const {
    name: stadiumName,
    address
  } = stadium

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{'Sân ' + numberOfS}</Text>
        <Text style={styles.info}>{stadiumName}</Text>
        <Text style={styles.info}>{'Địa chỉ: ' + address}</Text>
      </View>
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

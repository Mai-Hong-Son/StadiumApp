import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

const COLORS = {  
    FACEBOOK:               '#3b5998',
    GOOGLE:                 '#dd4b39',
    STARS:                  '#ff9800',
    WEFIT:                  '#292941',
    
    ALL_6:                  '#666666',
    ALL_9:                  '#999999',
    ALL_C:                  '#cccccc',
    ALL_E:                  '#eeeeee',
    TRIPLE_6E:              '#6e6e6e',
    PINK:                   '#e82e81',
    PURPLE:                 '#83358b',
  };

function formatText(template, ...args) {
    const plainTexts = template.split(/{\d+}/g);
    const indicies = _.map(template.match(/(?!{)\d+(?=})/ig), _.toInteger);
    const replaceTexts = _.map(indicies, idx => {
        const argItem = args[idx];
        return argItem == null ? '' : String(argItem);
    });

    const pairs = _.zip(plainTexts, replaceTexts);
    const resultParts = _.compact(_.concat(...pairs));
    return resultParts.join('');
}

export default function Timestamps({ color, duration, time, variant }) {
  const startHour = moment(time).format('HH:mm');
  const weekDay = _.capitalize(moment(time, 'dddd').format('dddd'));
  const date =  moment(time, 'MM/DD').format('MM/DD');

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={[styles.startHour, { color }]}>{startHour}</Text>
      {/* {variant === 'Sessions' && <Text numberOfLines={1} style={styles.duration}>{weekDay}</Text>}
      {variant === 'Sessions' && <Text numberOfLines={1} style={styles.duration}>{date}</Text>} */}
      <Text numberOfLines={1} style={styles.duration}>
        {formatText('{0} min', duration)}
      </Text>
    </View>
  );
}

Timestamps.defaultProps = {
  color: COLORS.ALL_9,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    flex: 0,
    width: 78,
  },
  startHour: {
    textAlign: 'center',
    fontSize: 17,
  },
  duration: {
    textAlign: 'center',
    color: COLORS.ALL_9,

    // Extra
    marginTop: 8,
  },
});

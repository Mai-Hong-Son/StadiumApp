/**
 * @providesModule WeFit.Components.AppNavigator.RootNavigator.MainStack.WeekdayTabs
 */

import React from 'react';
import { View, Platform, Dimensions } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';
import moment from 'moment';
import _ from 'lodash';

// Components
import Sessions from './../../Sessions/index';

const TABBAR_TOP_STYLES = {
    container: {
      backgroundColor: '#32CD32',
      height: 36,
    },
    containerFlex: {
      flex: 1,
    },
    indicatorStyle: {
      backgroundColor: 'pink',
      height: 4,
    },
    labelStyle: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
    },
    tabStyle: {
      height: 36,
      paddingHorizontal: 0,
      justifyContent: 'flex-end',
      marginTop: 4,
    },
  };

const TABBAR_TOP_CONFIGS = {
    animationEnabled: true,
    backBehavior: 'none',
    lazy: true,
    swipeEnabled: true,
    tabBarComponent: TabBarTop,
    tabBarOptions: {
      indicatorStyle: TABBAR_TOP_STYLES.indicatorStyle,
      labelStyle: TABBAR_TOP_STYLES.labelStyle,
      pressColor: 'transparent',
      scrollEnabled: true,
      style: TABBAR_TOP_STYLES.container,
      tabStyle: TABBAR_TOP_STYLES.tabStyle,
      upperCaseLabel: false,
    },
    tabBarPosition: 'top',
}

const FORMATS = {
    CURRENCY_SUFFIX: ' VNĐ',
    DATE_ID: 'YYYY-MM-DD',
    DATE_TITLE: 'dddd, DD/MM',
    EXPIRATION_DATE: 'DD/MM/YYYY',
    JSON_DATE: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
    JSON_DATE_ISO: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
    TIME: 'HH:mm',
  };

function buildWeekDayFormat() {
    const shortDate = 'MM/DD';
    const weekDay = {
      long: 'ddd',
      short: 'ddd'
    }
    const screenWidth = Dimensions.get("window").width;
    const wideScreen = Platform.select({ android: screenWidth > 350, ios: screenWidth > 320 });
    const weekDayTemplate = wideScreen ? weekDay.long : weekDay.short;
    return { date: shortDate, weekDay: weekDayTemplate };
  }

function buildNavigationOptions(tabId) {
  const today = moment().startOf('day');
  const nextDay = today.add(tabId, 'days');
  
  const dateId = nextDay.format(FORMATS.DATE_ID);
  const { date, weekDay } = buildWeekDayFormat();
  const title = _.capitalize(nextDay.format(`${weekDay}, ${date}`));

  return { dateId, tabId, title };
}

function getRouteConfigs(TabScene = View, routeName) {
    const tabIds = _.range(7);
    const routeKeys = _.map(tabIds, id => `${routeName}Tab_${id}`);
  
    const routeValues = _.map(tabIds, tabId => ({
      navigationOptions: () => buildNavigationOptions(tabId),
      /* eslint-disable react/prop-types */
      screen: props => {
        // Passing TabNavigator passed params to TabScene
        const { navigation: { state: { params } } } = props;
        const extraProps = { tabParams: params, variant: routeName };
        return <TabScene {...props} {...buildNavigationOptions(tabId)} {...extraProps} />;
      },
      /* eslint-enable react/prop-types */
    }));
  
    return _.zipObject(routeKeys, routeValues);
  }

function WeekdayTabs(TabScene, routeName) {
  return TabNavigator(getRouteConfigs(TabScene, routeName), TABBAR_TOP_CONFIGS);
}

export const OverallSchedulesTabs = WeekdayTabs(Sessions, 'Sessions');

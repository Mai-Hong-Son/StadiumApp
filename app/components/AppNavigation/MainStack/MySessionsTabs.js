import React from 'react';
import { View } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';
import _ from 'lodash';

// Components
import MySessions from '../../MySessions/withConnect';

const MY_SESSIONS = 'MySessions';
const UPCOMING = 'upcoming';
const PAST = 'past';

const TAB_IDS = [UPCOMING, PAST];

const TabBarComponent = props => (
  <TabBarTop
    {...props}
  />
);


const TABBAR_TOP_CONFIGS = {
  animationEnabled: false,
  backBehavior: 'none',
  swipeEnabled: true,
  tabBarComponent: TabBarComponent,
  tabBarOptions: {
    labelStyle: { color: '#fff', fontSize: 15 },
    pressColor: 'transparent',
    scrollEnabled: true,
    upperCaseLabel: false,
    activeTintColor: '#C71585',
    inactiveTintColor: '#fff',
    style: {
        backgroundColor: '#28a745',
    },
  },
  tabBarPosition: 'top',
  lazy: true
};

function getTitle(tabId) {
  const { [tabId]: title } = {
    [UPCOMING]: 'Lịch sắp tới',
    [PAST]: 'Lịch đã diễn ra',
  };

  return title;
}

function getRouteConfigs(TabScene = View) {
  const routeKeys = _.map(TAB_IDS, id => `${MY_SESSIONS}Tab_${id}`);
  const routeValues = _.map(TAB_IDS, tabId => ({
    navigationOptions: () => ({ tabId, title: getTitle(tabId) }),
    /* eslint-disable react/prop-types */
    screen: props => {
      // Passing TabNavigator passed params to TabScene
      const { navigation: { state: { params } } } = props;
      const extraProps = { tabId, tabParams: params, variant: MY_SESSIONS };
      return <TabScene {...props} {...extraProps} />;
    },
    /* eslint-enable react/prop-types */
  }));

  return _.zipObject(routeKeys, routeValues);
}

const MySessionsTabs = TabNavigator(getRouteConfigs(MySessions), {
  ...TABBAR_TOP_CONFIGS,
  tabBarOptions: {
    ...TABBAR_TOP_CONFIGS.tabBarOptions,
    scrollEnabled: false,
  },
});

export default MySessionsTabs;

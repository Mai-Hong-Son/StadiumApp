import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import Login from '../../Login/withConnect';
import Home from '../../Home/index';
import Maps from '../../Maps/index';
import Profiles from '../../Profiles/index';
import Stadiums from '../../Stadiums/withConnect';
import StadiumDetail from '../../StadiumDetail/withConnect';
import Sessions from '../../Sessions/withConnect';
import SessionDetail from '../../SessionDetail/index';
import Rating from '../../Rating/withConnect';
import Reservation from '../../Reservation/withConnect';
import { OverallSchedulesTabs } from './WeekdayTabs';
import Icon from 'react-native-vector-icons/Ionicons';

const StadiumStack = StackNavigator({
    Stadiums: {
        screen: Stadiums,
        navigationOptions: {
            header: null,
        }
    },
    StadiumDetail: {
        screen: StadiumDetail,
        navigationOptions: {
            tabBarVisible: false,
            title: null,
            headerStyle: {
                backgroundColor: '#32CD32',
                // elevation: 0, 
                // opacity: 0
            },
            headerBackTitleStyle : {
                opacity: 1
            },
            headerTintColor: '#ffffff',
        }
    },
    Sessions: {
        screen: OverallSchedulesTabs,
        cardStyle: {
            shadowColor: 'transparent',
        },
        navigationOptions: {
            tabBarVisible: false,
            // title: '',
            headerStyle: {
                backgroundColor: '#32CD32',
                elevation: 0, 
            },
            headerTitleStyle: {
                color: '#ffffff',
                marginLeft: '25%'
            },
            headerTintColor: '#ffffff'
        }
    },
    SessionDetail: {
        screen: SessionDetail,
        navigationOptions: {
            tabBarVisible: false,
            title: null,
            headerStyle: {
                backgroundColor: '#32CD32',
                elevation: 0, 
                opacity: 0
            },
            headerBackTitleStyle : {
                opacity: 1
            },
            headerTintColor: '#ffffff'
        }
    },
    Reservation: {
        screen: Reservation,
        navigationOptions: {
            tabBarVisible: false,
            title: 'Postal Payment',
            headerStyle: {
                backgroundColor: '#32CD32'
            },
            headerBackTitleStyle : {
                opacity: 1
            },
            headerTintColor: '#ffffff'
        }
    },
    Rating: {
        screen: Rating,
        navigationOptions: {
            tabBarVisible: false,
            title: null,
            headerStyle: {
                backgroundColor: '#32CD32',
                elevation: 0, 
            },
            headerTintColor: '#ffffff'
        }
    },
});

const RootTabs = TabNavigator({
    Home: {
        screen: Home,
    },
    StadiumLT: {
        screen: StadiumStack,
        navigationOptions: {
            tabBarLabel: 'Stadiums',
        }
    },
    Maps: {
        screen: Maps,
    },
    Profile: {
        screen: Profiles,
    },
},{
    navigationOptions:({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
              iconName = `ios-home${focused ? '' : '-outline'}`;
            } else if (routeName === 'StadiumLT') {
              iconName = `ios-football${focused ? '' : '-outline'}`;
            } else if (routeName === 'Maps') {
                iconName = `ios-map${focused ? '' : '-outline'}`;
            } else if (routeName === 'Profile') {
                iconName = `ios-person${focused ? '' : '-outline'}`;
            }
 
            return (<Icon name={iconName} size={25} color={tintColor} />);
        },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#D91283',
      inactiveTintColor: '#fff',
      style: {
          backgroundColor: '#32CD32',
      },
      showIcon: true,
    },
    lazy: true
});

export const MainStack = StackNavigator({
    Login: {
        screen: Login,
    },
    HomeStack: {
        screen: RootTabs,
    },
}, {
    navigationOptions: {
        header: null,
    }
});
  
export default MainStack;
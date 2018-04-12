import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import Login from '../../Login/withConnect';
import Home from '../../Home/index';
import Maps from '../../Maps/index';
import Profiles from '../../Profiles/index';
import Stadiums from '../../Stadiums/index';
import Sessions from '../../Sessions/index';
import SessionDetail from '../../SessionDetail/index';
import ConfirmSession from '../../ConfirmSession/index';
import { OverallSchedulesTabs } from './WeekdayTabs';
import Icon from 'react-native-vector-icons/Ionicons';

const StadiumStack = StackNavigator({
    Stadiums: {
        screen: Stadiums,
        navigationOptions: {
            header: null,
        }
    },
    Sessions: {
        screen: OverallSchedulesTabs,
        cardStyle: {
            shadowColor: 'transparent',
        },
        navigationOptions: {
            title: 'Session List',
            headerStyle: {
                backgroundColor: '#32CD32',
                elevation: 0, 
            },
            headerTitleStyle: {
                color: '#ffffff',
                marginLeft: '27%'
            },
            headerTintColor: '#ffffff'
        }
    },
    SessionDetail: {
        screen: SessionDetail,
        navigationOptions: {
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
    ConfirmSession: {
        screen: ConfirmSession,
        navigationOptions: {
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

const MainStack = StackNavigator({
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
import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import Login from '../../Login/withConnect';
import Home from '../../Home/index';
import MySessionsTabs from  './MySessionsTabs';
import Profiles from '../../Profiles/withConnect';
import Stadiums from '../../Stadiums/withConnect';
import StadiumDetail from '../../StadiumDetail/withConnect';
import Sessions from '../../Sessions/withConnect';
import SessionDetail from '../../SessionDetail/withConnect';
import Rating from '../../Rating/withConnect';
import BookingSuccess from '../../BookingSuccess/withConnect';
import Reservation from '../../Reservation/withConnect';
import { OverallSchedulesTabs } from './WeekdayTabs';
import Icon from 'react-native-vector-icons/Ionicons';

export const RootTabs = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Trang Chủ',
            header: null
        }
    },
    Stadiums: {
        screen: Stadiums,
        navigationOptions: {
            title: 'Chọn Sân',
            header: null,
        }
    },
    MySessions: {
        screen: MySessionsTabs,
        navigationOptions: {
            title: 'Lịch Của Tôi',
            headerStyle: { backgroundColor: '#28a745', borderBottomColor: 'transparent' },
            headerTitleStyle: { color: '#fff' },
            headerLeft: null
        }
    },
    Profile: {
        screen: Profiles,
        navigationOptions: {
            title: 'Thông Tin',
            header: null
        }
    },
},{
    navigationOptions:({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
              iconName = `ios-home${focused ? '' : '-outline'}`;
            } else if (routeName === 'Stadiums') {
              iconName = `ios-football${focused ? '' : '-outline'}`;
            } else if (routeName === 'MySessions') {
                iconName = `ios-calendar${focused ? '' : '-outline'}`;
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
      activeTintColor: '#C71585',
      inactiveTintColor: '#fff',
      style: {
          backgroundColor: '#28a745',
      },
      showIcon: true,
    },
    lazy: true
});

export const RootStacks = StackNavigator({
    HomeTab: {
        screen: RootTabs,
        // navigationOptions: {
        //     header: null,
        // }
    },
    StadiumDetail: {
        screen: StadiumDetail,
        navigationOptions: {
            title: null,
            headerStyle: {
                backgroundColor: '#28a745',
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
            // title: '',
            headerStyle: {
                backgroundColor: '#28a745',
                borderBottomColor: 'transparent',
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
            title: null,
            headerStyle: {
                backgroundColor: '#28a745',
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
            title: 'Postal Payment',
            headerStyle: {
                backgroundColor: '#28a745'
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
            title: null,
            headerStyle: {
                backgroundColor: '#28a745',
                elevation: 0, 
            },
            headerTintColor: '#ffffff'
        }
    },
    BookingSuccess: {
        screen: BookingSuccess,
        navigationOptions: {
            // tabBarVisible: false,
            tabBarOptions: {
                style: {
                    backgroundColor: '#28a745',
                    elevation: 0, 
                    opacity: 0
                },
              },
            header: null
        }
    },
})

export const MainStack = StackNavigator({
    Login: {
        screen: Login,
    },
    RootStack: {
        screen: RootStacks,
    },
}, {
    navigationOptions: {
        header: null,
    }
});
  
export default MainStack;
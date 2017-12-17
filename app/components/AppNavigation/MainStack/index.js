import { TabNavigator, StackNavigator } from 'react-navigation';
import Login from '../../Login/withConnect';
import Home from '../../Home/index';
import Maps from '../../Maps/index';
import Profiles from '../../Profiles/index';
import Stadiums from '../../Stadiums/index';
import Sessions from '../../Sessions/index';
import { OverallSchedulesTabs } from './WeekdayTabs';

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
});

const RootTabs = TabNavigator({
    Home: {
        screen: Home,
    },
    StadiumLT: {
        screen: StadiumStack,
        navigationOptions: {
            title: 'Stadiums',
        }
    },
    Maps: {
        screen: Maps,
    },
    Profile: {
        screen: Profiles,
    },
},{
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'pink',
      style: {
          backgroundColor: '#32CD32',
      }
    },
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
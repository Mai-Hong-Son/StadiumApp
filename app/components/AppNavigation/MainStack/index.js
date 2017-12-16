import { TabNavigator, StackNavigator } from 'react-navigation';
import Login from '../../Login/withConnect';
import Home from '../../Home/index';
import Maps from '../../Maps/index';
import Profiles from '../../Profiles/index';
import Stadiums from '../../Stadiums/index';

const RootTabs = TabNavigator({
    Home: {
        screen: Home,
    },
    Stadiums: {
        screen: Stadiums,
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
      activeTintColor: '#ADD8E6',
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
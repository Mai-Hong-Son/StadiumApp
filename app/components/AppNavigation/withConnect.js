import { connect } from 'react-redux';
import AppNavigation from './index'

const mapStateToProps = (state) => ({
    nav: state.navReducer
});
  
export const AppWithNavigationState = connect(mapStateToProps)(AppNavigation);
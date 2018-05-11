import { connect } from 'react-redux';
import BookingSuccessView from './index';
import { navigations } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { mainRouter: router } = state;

    return {
        router
    };
}

function mapDispatchToProps(dispatch) {
    return {
        navigateMainTab: tabName => dispatch(navigations.navigateMainTab(tabName)),
    };
}

const BookingSuccess = connect(
    mapStateToProps,
    mapDispatchToProps
)(BookingSuccessView);

export default BookingSuccess;
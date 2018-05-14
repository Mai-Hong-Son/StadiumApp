import { connect } from 'react-redux';
import ReservationView from './index';
import { handleReservation, handleUser, navigations } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { checkLogin: { userId }, allUser, statusBooking, reservations } = state

    return {
        userId, allUser, statusBooking, reservations
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createNewReservation: (reservation) => dispatch(handleReservation.createNewReservation(reservation)),
        getAllUser: () => dispatch(handleUser.getAllUser()),
        getALlReservation: () => dispatch(handleReservation.getAllReservation()),
        navigateMainTab: tabName => dispatch(navigations.navigateMainTab(tabName)),
    };
}

const Reservation = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReservationView);

export default Reservation;
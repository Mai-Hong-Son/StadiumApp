import { connect } from 'react-redux';
import ReservationView from './index';
import { handleReservation, handleUser } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { checkLogin: { userId }, allUser } = state

    return {
        userId, allUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createNewReservation: (reservation) => dispatch(handleReservation.createNewReservation(reservation)),
        getAllUser: () => dispatch(handleUser.getAllUser())
    };
}

const Reservation = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReservationView);

export default Reservation;
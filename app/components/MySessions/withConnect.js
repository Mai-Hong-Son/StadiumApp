import { connect } from 'react-redux';
import MySessionsView from './index';
import { handleReservation, handleUser } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { checkLogin: { userId }, allUser, reservations } = state

    return {
        userId, allUser, reservations
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUser: () => dispatch(handleUser.getAllUser()),
        getALlReservation: () => dispatch(handleReservation.getAllReservation()),
        deleteReservation: (reservationId) => dispatch(handleReservation.deleteReservation(reservationId))
    };
}

const MySessions = connect(
    mapStateToProps,
    mapDispatchToProps
)(MySessionsView);

export default MySessions;
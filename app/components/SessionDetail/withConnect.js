import { connect } from 'react-redux';
import SessionDetailView from './index';
import { handleReservation, handleUser } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { checkLogin: { userId }, reservations } = state

    return {
        userId, reservations
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getALlReservation: () => dispatch(handleReservation.getAllReservation())
    };
}

const SessionDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionDetailView);

export default SessionDetail;
import { connect } from 'react-redux';
import SessionsView from './index';
import { getStadium, getSessions} from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { allStadiums, sessions } = state

    return {
        allStadiums, sessions
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllStadium: () => dispatch(getStadium.getStadiums()),
        getAllSession: (stadiumId, date) => dispatch(getSessions.getAllSessionByStadium(stadiumId,date)),
    };
}

const Sessions = connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionsView);

export default Sessions;
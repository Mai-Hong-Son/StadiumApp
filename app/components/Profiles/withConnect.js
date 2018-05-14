import { connect } from 'react-redux';
import ProfilesView from './index';
import { handleUser, accessState } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { checkLogin: { userId }, allUser } = state

    return {
        userId, allUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkLogout: () => dispatch(accessState.checkLogout()),
        getAllUser: () => dispatch(handleUser.getAllUser()),
    };
}

const Profiles = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilesView);

export default Profiles;
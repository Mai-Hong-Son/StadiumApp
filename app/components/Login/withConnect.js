import { connect } from 'react-redux';
import LoginView from './index';
import { accessState, handleUser } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { allUser } = state;
    const { isLogin, userId } = state.checkLogin;

    return {
        isLogin, userId, allUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkLogin: (userId) => dispatch(accessState.checkLogin(userId)),
        createUser: (user) => dispatch(handleUser.createNewUser(user)),
        updateUser: (user) => dispatch(handleUser.updateUser(user)),
        getAllUser: () => dispatch(handleUser.getAllUser()),
    };
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);

export default Login;
import { connect } from 'react-redux';
import LoginView from './index';
import { accessState, handleUser } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { isLogin, userId } = state.checkLogin;

    return {
        isLogin, userId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkLogin: (userId) => dispatch(accessState.checkLogin(userId)),
        createUser: (user) => dispatch(handleUser.createNewUser(user))
    };
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);

export default Login;
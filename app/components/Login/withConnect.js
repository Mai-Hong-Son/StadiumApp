import { connect } from 'react-redux';
import LoginView from './index';
import { accessState } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { isLogin } = state.checkLogin;

    return {
        isLogin
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkLogin: () => dispatch(accessState.checkLogin()),
    };
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);

export default Login;
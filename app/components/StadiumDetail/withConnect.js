import { connect } from 'react-redux';
import StadiumDetailView from './index';
import { getStadium } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { allStadiums, checkLogin: { userId } } = state

    return {
        allStadiums, userId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllStadium: () => dispatch(getStadium.getStadiums()),
    };
}

const StadiumDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(StadiumDetailView);

export default StadiumDetail;
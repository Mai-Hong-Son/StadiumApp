import { connect } from 'react-redux';
import StadiumView from './index';
import { getStadium } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { stadiums } = state

    return {
        stadiums
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllStadium: () => dispatch(getStadium.getAllStadium()),
    };
}

const Stadiums = connect(
    mapStateToProps,
    mapDispatchToProps
)(StadiumView);

export default Stadiums;
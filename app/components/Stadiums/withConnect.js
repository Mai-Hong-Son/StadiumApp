import { connect } from 'react-redux';
import StadiumView from './index';
import { getStadium } from '../../../redux/actions/index';

function mapStateToProps(state) {
    console.warn(state)
    const { stadiums } = state

    return {
        stadiums
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllStadium: (page, perPage) => dispatch(getStadium.getAllStadium(page, perPage)),
    };
}

const Stadiums = connect(
    mapStateToProps,
    mapDispatchToProps
)(StadiumView);

export default Stadiums;
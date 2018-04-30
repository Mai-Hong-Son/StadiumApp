import { connect } from 'react-redux';
import StadiumView from './index';
import { getStadium, getDistrict } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { stadiums, districts, stadiumsByDistrict } = state

    return {
        stadiums, districts, stadiumsByDistrict
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllStadium: (page, perPage) => dispatch(getStadium.getAllStadium(page, perPage)),
        getAllDistrict: () => dispatch(getDistrict.getAllDistrict()),
        listStadiumByDistrict: (page, perPage, districtId) => dispatch(getStadium.getAllStadiumByDistrict(page, perPage, districtId))
    };
}

const Stadiums = connect(
    mapStateToProps,
    mapDispatchToProps
)(StadiumView);

export default Stadiums;
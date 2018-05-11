import { connect } from 'react-redux';
import RatingView from './index';
import { handleRating, handleUser, navigations } from '../../../redux/actions/index';

function mapStateToProps(state) {
    const { checkLogin: { userId }, allUser } = state

    return {
        userId, allUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createNewRating: (rating) => dispatch(handleRating.createNewRating(rating)),
        getAllUser: () => dispatch(handleUser.getAllUser()),
        navigateMainTab: tabName => dispatch(navigations.navigateMainTab(tabName)),
    };
}

const Rating = connect(
    mapStateToProps,
    mapDispatchToProps
)(RatingView);

export default Rating;
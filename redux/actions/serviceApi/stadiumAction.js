
function listStadium() {
    return {
        type: 'GET_ALL_STADIUM',
        payload: {
            request:{
              url:'/stadiums'
            }
        }
    }
}

export function getAllStadium() {
    return dispatch => {
        try{
            dispatch(listStadium());
        }
        catch(err) {
            console.log(err)
        }
    }
}
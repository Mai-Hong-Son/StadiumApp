
function listStadium(page, perPage) {
    return {
        type: 'GET_ALL_STADIUM',
        payload: {
            request:{
              url:`/stadiums?page=${page}&perPage=${perPage}`
            }
        }
    }
}

export function getAllStadium(page, perPage) {
    return dispatch => {
        try{
            dispatch(listStadium(page,perPage));
        }
        catch(err) {
            console.log(err)
        }
    }
}
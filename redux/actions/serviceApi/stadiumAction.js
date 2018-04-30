
function listStadium(page, perPage) {
    return {
        type: 'GET_ALL_STADIUM',
        payload: {
            request:{
              url:`/stadiums?page=${page}&perPage=${perPage}`,
              params: { page, perPage },
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }
        }
    }
}

function listStadiumByDistrict(page, perPage, districtId) {
    return {
        type: 'GET_ALL_STADIUM_BY_DISTRICT',
        payload: {
            request:{
              url:`/stadiums?page=${page}&perPage=${perPage}&districtId=${districtId}`,
              params: { page, perPage },
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
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

export function getAllStadiumByDistrict(page, perPage, districtId) {
    return dispatch => {
        try{
            dispatch(listStadiumByDistrict(page, perPage, districtId));
        }
        catch(err) {
            console.log(err)
        }
    }
}
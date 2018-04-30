
function listDistrict() {
    return {
        type: 'GET_ALL_DISTRICT',
        payload: {
            request:{
              url:`/districts`
            }
        }
    }
}

export function getAllDistrict() {
    return dispatch => {
        try{
            dispatch(listDistrict());
        }
        catch(err) {
            console.log(err)
        }
    }
}
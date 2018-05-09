
function createRating(rating) {

    return {
        type: 'CREATE_RATING',
        payload: {
            request:{
                url:`/rate`,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(rating)
            }
        }
    }
}

export function createNewRating(rating) {
    return dispatch => {
        try{
            dispatch(createRating(rating));
        }
        catch(err) {
            console.log(err)
        }
    }
}
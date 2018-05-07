

function listSessionByStadium(stadiumId, date) {
    return {
        type: 'GET_ALL_SESSIONS',
        payload: {
            request:{
              url:`/sessions?stadiumId=${stadiumId}&date=${date}`,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }
        }
    }
}

export function getAllSessionByStadium(stadiumId, date) {
    return dispatch => {
        try{
            dispatch(listSessionByStadium(stadiumId,date));
        }
        catch(err) {
            console.log(err)
        }
    }
}
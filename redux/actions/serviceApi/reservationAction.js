
function reservationUser(reservation) {
    return {
        type: 'CREATE_RESERVATION',
        payload: {
            request:{
                url:`/reservation`,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(reservation)
            }
        }
    }
}

export function createNewReservation(reservation) {
    return dispatch => {
        try{
            dispatch(reservationUser(reservation));
        }
        catch(err) {
            console.log(err)
        }
    }
}

function listReservation() {
    return {
        type: 'GET_ALL_RESERVATION',
        payload: {
            request:{
              url:`/reservations`,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }
        }
    }
}

export function getAllReservation() {
    return dispatch => {
        try{
            dispatch(listReservation());
        }
        catch(err) {
            console.log(err)
        }
    }
}
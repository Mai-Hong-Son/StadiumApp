
function userLogin(user) {
    return {
        type: 'CREATE_USER',
        payload: {
            request:{
                url:`/user`,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(user)
            }
        }
    }
}

function allUser() {
    return {
        type: 'GET_ALL_USER',
        payload: {
            request:{
                url:`/users`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        }
    }
}

export function createNewUser(user) {
    return dispatch => {
        try{
            dispatch(userLogin(user));
        }
        catch(err) {
            console.log(err)
        }
    }
}

export function getAllUser() {
    return dispatch => {
        try{
            dispatch(allUser());
        }
        catch(err) {
            console.log(err)
        }
    }
}
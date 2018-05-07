
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
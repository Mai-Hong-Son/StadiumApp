
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

function editUser(user) {
    return {
        type: 'CREATE_USER',
        payload: {
            request:{
                url:`/user`,
                method: 'PUT',
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
    return async dispatch => {
        try{
            const data = await user;
            dispatch(userLogin(data));
        }
        catch(err) {
            console.log(err)
        }
    }
}

export function updateUser(user) {
    return async dispatch => {
        try{
            const data = await user;
            dispatch(editUser(data));
        }
        catch(err) {
            console.log(err)
        }
    }
}

export function getAllUser() {
    return async dispatch => {
        try{
            dispatch(allUser());
        }
        catch(err) {
            console.log(err)
        }
    }
}
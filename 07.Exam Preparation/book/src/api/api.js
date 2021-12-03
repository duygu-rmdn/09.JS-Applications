
//UNIVERSAL REQUESTS MODULE - usually in file api.js
//Tied to the REST service (data server)

import { getUserData, setUserData, clearUserData } from "../util.js"; //recommended; or use the commented lines for const userData


const host = 'http://localhost:3030'; //so requests need only add the end
//Lower level functions
//Universal requester
async function request(url, options) {
    try {
        const response = await fetch(host + url, options); //Adds host here, don't add host to the other request functions!
        if (response.ok != true) {
            //403 = token/registration problems, so app falsely consideres user as logged in
            //and prevents the user from actually logging in
            if (response.status == 403) {
                sessionStorage.removeItem('userData');
            }

            const error = await response.json();
            throw new Error(error.message);
        }
        //If the response is OK, there are 2 possibilities:
        if (response.status == 204) { //response doesn't contain data, aka no body (e.g. on logout)
            return response;  //return it directly, no await necessary
        } else {
            return response.json();  //response contains data -> return parsed data, no await necessary?? //TODO: check with await
        }
        // try {
        //     return response.json();
        // } catch (err) {
        //     return response;
        // }
        //Alternative for the above: try { return response.json(); } catch(err) { return response;}
        //TODO: The server for MemeLounge is an older version and returns 200 without body for logout; it should be caught, if not - use the syntax from the comment above

    } catch (err) {
        alert(err.message);
        throw err; //important to throw it for whatever has called this function - so it can throw as well
        //otherwise we get undefined and functions think it's ok
    }
}

//Decorate the request function with the four CRUD higher level functions, use a createOptions function with additional authorization for DRY
export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function get(url) {
    return request(url, createOptions());//createOptions is for logout, small optimization
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) { //cannot use delete, it's a keyword; id is in url
    return request(url, createOptions('delete'));
}

function createOptions(method = 'get', data) { //since post and put are very similar; default method GET
    const options = {
        method,
        headers: {}
    };
    if (data != undefined) { //check if undefined specifically if (data) will accept null, which could ba a valid value in some cases
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    //const userData = JSON.parse(sessionStorage.getItem('userData')); //user session data; can use getUserData() from util.js
    const userData = getUserData();
    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }

    return options;
}



//LOGIN
export async function login(email, password) {
    const result = await post('/users/login', { email, password }); //request takes care of errors
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
        //add more data if required
    };
    setUserData(userData);
    // sessionStorage.setItem('userData', JSON.stringify(userData));//if not using functions from util.js as you should
    return result; //good to have in case the app may need it at some point
}

//REGISTER - like login, just change the address, add userData properties if necessary
export async function register(email, password) {
    const result = await post('/users/register', { email, password }); //request takes care of errors
    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };

    setUserData(userData);
    //sessionStorage.setItem('userData', JSON.stringify(userData)); //if not importing from data.js
    return result; //just in case
}
//LOGOUT
export async function logout() {
    await get('/users/logout'); //will get userData
    clearUserData();
    //sessionStorage.removeItem('userData'); //can use .clear but there may be something else we've stored there as well
}


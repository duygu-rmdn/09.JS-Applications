//User session/data management
export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));//parse for further processing, will return a string otherwise
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));//our server uses JSON
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}
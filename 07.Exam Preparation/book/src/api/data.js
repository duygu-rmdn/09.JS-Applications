import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const host = 'http://localhost:3030';

//const endpoints = {
//    register: '/users/register',
//    login: '/users/login',
//    logout: '/users/logout',
//    memes: '/data/books?sortBy=_createdOn%20desc',
//    create: '/data/books',
//    details: '/data/books/',
//    delete: '/data/books/',
//   // myBooks: `/data/books?where=_ownerId%3D%22${user}%22&sortBy=_createdOn%20desc`
//   // profile: '/data/memes?where=_ownerId%3D%220002%22&sortBy=_createdOn%20desc'
//};

export async function getAllBooks() {
    return api.get('/data/books?sortBy=_createdOn%20desc');
}


export async function getBookById(id) {
    return api.get('/data/books/' + id);
}

export async function getMyBooks(userId) {
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

//Function that creates an item, e.g.
export async function addBook(book) {
    return api.post('/data/books', book);
}
//Import the creating function in createPage, where the data is read from the input fields
//Pass the input data to it with await in order to create the object (aka make the create request)

export async function editBook(id, book) {
    return api.put('/data/books/' + id, book);
}

export async function deleteBook(id) {
    return api.del('/data/books/' + id);
}


//LIKE
export async function likeBook(bookId) {
    return api.post('/data/likes', { bookId });
}

//Total likes for a book
export async function getTotalLikes(bookId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

//Likes by current user for a specific book
export async function getMyLikes(bookId, userId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}


//Example Search - not included in task!!!
export async function searchBooks(query) {
    return api.get('/data/books?where=' + encodeURIComponent(`title LIKE "${query}"`));//note query clause syntax
}

//For TESTING with await window.api.functionName in browser console - comment out when done; will be usable in the console when the whole data.js is imported, no need to write window.api = api in app.js
//If window.api doesn't work in the browser console, check function names, urls and imports

//window.getMyLikes = getMyLikes;
//await getLikesForBookByUser("b559bd24-5fb6-4a42-bc48-40c17dea649d", "35c62d76-8152-4626-8712-eeb96381bea8")
//window.api = {
//    getAllBooks,
//    getBookById,
//    getMyBooks,
//    likeBook,
//    getTotalLikes,
//    getLikesForBookByUser
//}


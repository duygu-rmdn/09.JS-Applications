import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllBooks(){
    return api.get('/data/books?sortBy=_createdOn%20desc');
}

export async function createBook(data){
    return api.post('/data/books', data)
}

export async function getBookById(id){
    return api.get('/data/books/' + id);
}

export async function deleteById(id){
    return api.del('/data/books/' + id)
}

export async function editBook(id, book) {
    return api.put('/data/books/' + id, book);
}

export async function getMyBooks(userId) {
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
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
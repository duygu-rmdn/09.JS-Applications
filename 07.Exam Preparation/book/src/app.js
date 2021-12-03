import { page, render } from './lib.js';
import { loginPage } from './views/login.js';
import { getUserData, setUserData, clearUserData } from "./util.js";
import { logout } from './api/api.js';
import { homePage } from './views/home.js';
import { detailsPage } from './views/details.js';
import { registerPage } from './views/register.js'
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { myBooksPage } from './views/my-books.js';
import { searchPage } from './views/search.js';
import * as api from './api/data.js'; //for data retrieval testing

//window.api = api; //for requests testing
//console.log(getUserData())
//Example: imported views
//import { catalogPage } from '../views/catalog.js';


const root = document.getElementById('site-content'); //root folder where we will append/detatch elements TODO: update selector
document.getElementById('logoutBtn').addEventListener('click', onLogout);//TODO: check button id/selector
//For the initial testing when the visualization is not cleaned up yet, look within the root

page(decorateContext);// here, so the functions in page () below will have the context.

//The below line is one way to test, can use console.log in the view file itself
//page('/', () => console.log('home view')); //test if page import isn't screwed up


//Examples with proper view
//Views here - follow the examples, replace console.log
//Note we remove the () => as we now have proper functions and don't need an anonymous one for console.log
//TODO: make sure all views are added here! And import them above! Can uncomment to add a matching view
page('/', homePage); //home page - index.html ! just '/'
page('/login', loginPage);
page('/register', registerPage);
//page('/memes', catalogPage); //the first param is what should appear in the browser's url tab - e.g. in this case it should be http://localhost:3000/memes
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/my-books', myBooksPage);
page('/search', searchPage)


//page('/my-furniture', catalogPage); //home page - index.html ! just '/'


updateUserNav();
page.start(); //Don't forget to start page!!!!

function decorateContext(ctx, next) {//this makes it possible to call ctx.updateUserNav in other modules
    ctx.updateUserNav = updateUserNav;
    ctx.render = (content) => render(content, root);//take content from the context and render it in the root element   
    next(); //Important! Otherwise the execution of the middleware above will block the execution of the next renders.
}

async function onLogout() {
    await logout(); //no await
    updateUserNav();
    page.redirect('/');
}

export function updateUserNav() {
    const userData = getUserData();

    if (userData) {//TODO: check selectors, Welcome message and style.display in CSS
        document.querySelector('#user').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`

    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'inline-block';
    }
}

//Check links in HTML files! Should be w.ithout file extensions, e.g href="/create/"   not href="/create.html"
//Sice we use templates in .js files for the views and NOT HTML files (those are to get the HTML for the templates).
//Click on links to check if they work by utilizing console log with () => or in the views themselves. If they do not work, check links for wrongly left .html / wrong path.
//Test views with the browser urls e.g. test view with memes @ http://localhost:3000/memes





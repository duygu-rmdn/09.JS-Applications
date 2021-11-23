import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showSignUp } from "./signUp.js";


const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showSignUp,
}

document.querySelector('nav').addEventListener('click', (even) => {
    const view  = views[even.target.id];
    if(typeof view == 'function'){
        even.preventDefault();
        view();
    }
});

showHome();
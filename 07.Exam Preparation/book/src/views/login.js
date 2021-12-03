import { html } from '../lib.js';
import { login } from '../api/api.js';
//import { updateUserNav } from '../app.js'

const loginTemplate = (onSubmit) => html`
<section id="login-page" class="login">
    <form @submit=${onSubmit} id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
    </form>
</section>
`;


export function loginPage(ctx) {
    console.log('login view');
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        //Spare a request if data is not valid
        if (email == '' || password == '') {
            return alert('Please fill all fields!');
        }
        await login(email, password); //make sure param order is correct, as in api.js
       ctx.updateUserNav();
        //redirect
        ctx.page.redirect('/'); //TODO:DO NOT FORGET REDIRECT

    }
}

//for register, check if all fields are filled in the export function above (loginPage / registerPage), e.g.
// //check if all fields are filled here
     //   if (username == '' || email == '' || password == '' || gender == '') {
      //      return alert('All fields are required!'); //gender has default checked and will always be filled but just in case
      //  }

      //  if (password != repeatPass) {
       //     return alert('Passwords don\'t match!');
      //  }
     //   await register(username, email, password, gender);
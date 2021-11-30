import { login, updateUserNav } from '../api/api.js';
import { html, page } from '../lib.js';

const loginTemplate = (onSubmit, errMsg) => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Login User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${onSubmit}>
<div class="row space-top">
    <div class="col-md-4">
        ${errMsg ? html`<div class="form-group error">${errMsg}</div>` : null}
        <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input class=${"form-control" + (errMsg ? ' is-invalid' : ' is-valid')} id="email" type="text" name="email">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input class=${"form-control" + (errMsg ? ' is-invalid' : ' is-valid')} id="password" type="password" name="password">
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
    </div>
</div>
</form>`;

export function loginPage(ctx){
    update();

    function update(errMess){
        ctx.render(loginTemplate(onSubmit, errMess));
    }

    async function onSubmit(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const email = formData.get('email');
        const password = formData.get('password');

        try{
        await login(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/');
        } catch (err){
            update(err.message);
        }
    }
} 
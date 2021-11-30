import { register } from '../api/api.js';
import { html } from '../lib.js'

const registerTemplate = (onSubmit, errMsg) => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Register New User</h1>
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
        <div class="form-group">
            <label class="form-control-label" for="rePass">Repeat</label>
            <input class=${"form-control" + (errMsg ? ' is-invalid' : ' is-valid')} id="rePass" type="password" name="rePass">
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
    </div>
</div>
</form>`;

export function registerPage(ctx) {
    update();

    function update(errMess){
        ctx.render(registerTemplate(onSubmit, errMess));
    }

    async function onSubmit(ev) {
        ev.preventDefault();
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('rePass').trim();

        try {
            if (email == '' || password == '' || rePass == '') {
                throw Error('All filads are required');
            }
            if (password != rePass) {
                throw Error('Passwords don\'t match!');
            }
            await register('', email, password, '');
            ctx.updateUserNav();
            ctx.page.redirect('/');
        } catch (err) {
            update(err.message);
        }
    }
}
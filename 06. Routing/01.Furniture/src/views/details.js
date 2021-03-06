import { deleteItem, getById } from '../api/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (itemPromise) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
${until(itemPromise, html`<p>Loading...</p>`)}
</div>`;

const cardTemplate = (item, isOwner, onDelete) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${item.img} />
        </div>
    </div>
</div>
<div class="col-md-4">
    <p>Make: <span>${item.make}</span></p>
    <p>Model: <span>${item.model}</span></p>
    <p>Year: <span>${item.year}</span></p>
    <p>Description: <span>${item.description}</span></p>
    <p>Price: <span>${item.price}</span></p>
    <p>Material: <span>${item.material}</span></p>
    ${isOwner ? html`<div>
    <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
    </div>` : ''}
</div>`;

export function detailsPage(ctx) {
    ctx.render(detailsTemplate(loaditem(ctx.params.id, onDelete)));

    async function onDelete(){
        const choise = confirm('Are you sure you want to delete item?');

        if(choise){
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}

async function loaditem(id, onDelete) {
    const item = await getById(id);

    const userData = getUserData();
    const isOwner = userData.id == item._ownerId;

    return cardTemplate(item, isOwner, onDelete);

}
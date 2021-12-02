import { deleteById, getMemeById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (data, isOwner, onDelete) => html `
<section id="meme-details">
            <h1>Meme Title: ${data.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${data.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>${data.description}</p>
                    ${isOwner ? html`<a class="button warning" href="/edit/${data._id}"> Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>` : null}
                </div>
            </div>
        </section>`;

export async function detailsPage(ctx){
    const data = await getMemeById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData && userData.id == data._ownerId;
    ctx.render(detailsTemplate(data, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm("Are you sure to delete this meme?")
        if (choice) {
            await deleteById(ctx.params.id)
            ctx.page.redirect('/memes')
        }
    }
    
}
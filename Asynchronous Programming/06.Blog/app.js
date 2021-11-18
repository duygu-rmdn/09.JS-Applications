function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPost)
    document.getElementById('btnViewPost').addEventListener('click', viewAllInfo)

}

attachEvents();

async function getAllPost(){
    const url = `http://localhost:3030/jsonstore/blog/posts`;
    const res = await fetch(url);
    const data = await res.json();

    const posts = document.getElementById('posts');
    posts.innerHTML = '';
    
    Object.entries(data).forEach(element => {
        const optionElement = document.createElement('option');
        optionElement.textContent = element[1].title;
        optionElement.value = element[0];
        posts.appendChild(optionElement);
    });  

}


async function viewAllInfo(){
    const selectedPost = document.getElementById('posts').value;
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const post = await getPostById(selectedPost);
    postTitle.textContent = post.title;
    postBody.textContent = post.body;

    viewAllComents(selectedPost)
}

async function viewAllComents(postId){
    const url = `http://localhost:3030/jsonstore/blog/comments`;
    const res = await fetch(url);
    const data = await res.json();
    const postCom = document.getElementById('post-comments');
    postCom.innerHTML = '';

    const comments = Object.values(data).filter(x => x.postId == postId);

    comments.forEach(element => {
        const li = document.createElement('li');
        li.textContent = element.text;
        li.id = element.id;
        postCom.appendChild(li);
    });
}

async function getPostById(postId){
    const url = `http://localhost:3030/jsonstore/blog/posts/${postId}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
}
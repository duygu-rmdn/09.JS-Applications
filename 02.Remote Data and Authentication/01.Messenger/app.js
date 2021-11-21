function attachEvents() {
    document.getElementById('refresh').addEventListener('click', loadMessages)
    document.getElementById('submit').addEventListener('click', createMessages)
}

attachEvents();

async function loadMessages(){
    const url = 'http://localhost:3030/jsonstore/messenger';
    const res = await fetch(url);
    const data = await res.json();

    const messages = Object.values(data);

    const textarea = document.getElementById('messages');
    textarea.textContent = '';
    messages.forEach(element => {
        textarea.textContent += `${element.author}: ${element.content}\n`
    });
}

async function createMessages(){
    const name = document.getElementsByTagName('input')[0].value;
    const contend = document.getElementsByTagName('input')[1].value;
    const message = {author: name, content: contend};
    const url = 'http://localhost:3030/jsonstore/messenger';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    };
    document.getElementsByTagName('input')[0].value = '';
    document.getElementsByTagName('input')[1].value = '';

    const res = await fetch(url, options);
    const result = await res.json();

    loadMessages()
}
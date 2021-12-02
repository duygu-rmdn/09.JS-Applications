const element = document.getElementById('errorBox');
const output = document.querySelector('span');

export function notify(msg){
    output.textContent = msg;
    element.style.display = 'block';
}
import { html, render } from "./node_modules/lit-html/lit-html.js";

const studentRow = (student) => html`<tr class=${student.match ? 'select' : ''}>
<th>${student.item.firstName} ${student.item.lastName}</th>
<th>${student.item.email}</th>
<th>${student.item.course}</th>
</tr>`;

const input = document.getElementById('searchField');
document.getElementById('searchBtn').addEventListener('click', onSearch);
let students;
start();

async function start(){
   const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await res.json()
   students = Object.values(data).map(s => ({ item: s, match: false}));

   update();
}

function update(){
   render(students.map(studentRow), document.querySelector('tbody'))
}

function onSearch(){
   const values = input.value.trim().toLocaleLowerCase();
   for (const item of students) {
      item.match = Object.values(item.item).some(v => values && v.toLocaleLowerCase().includes(values))
   }

   update();
}
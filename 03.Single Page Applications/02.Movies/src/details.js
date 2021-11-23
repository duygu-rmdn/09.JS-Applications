import { showView } from "./dom.js";

const section = document.getElementById('movie-example');
section.remove();

export function showDetails(movieId) {
    showView(section);
    console.log(movieId)
}
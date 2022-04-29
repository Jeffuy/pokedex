import { registerImage } from "./lazy.js";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const LIMIT = 151;

document.querySelector("#pokeButton").addEventListener("click", pokeButton);
//document.addEventListener("DOMContentLoaded", pokeButton);

let container = document.querySelector("#container");

function pokeButton() {
    let random = Math.floor(Math.random() * 251) + 1;
    console.log(random);
    catchEmAll(random);
}

function pokeShow(pokeName, pokeImg, pokeType) {
    //limpio el container

    //creo el card
    let card = document.createElement("div");
    card.className = "card";

    //creo el titulo
    let name = document.createElement("h2");
    name.innerText = pokeName.toUpperCase();
    card.appendChild(name);
    name.className = "card-title";

    //creo la imagen
    let img = document.createElement("img");
	img.className = "card-img";
    img.dataset.src = pokeImg;
    img.alt = pokeName;
    card.appendChild(img);
    

    //creo el tipo
    let type = document.createElement("p");
    type.innerText = pokeType.toUpperCase();
    card.appendChild(type);
    type.className = "card-type";

    //pego todo en el container
    container.appendChild(card);
	registerImage(img);
}

async function catchEmAll(random) {
    if (LIMIT > 0) {
        const res = await fetch(API_URL + `?limit=${LIMIT}`);
        const data = await res.json();

        for (let i = 0; i < data.results.length; i++) {
            const res = await fetch(data.results[i].url);
            const data2 = await res.json();
            let pokeName = data2.name;
            let pokeImage = data2.sprites.other.dream_world.front_default;
            let pokeType = data2.types[0].type.name;
            pokeShow(pokeName, pokeImage, pokeType);
        }
    } else {
        const res = await fetch(API_URL + random);
        const data = await res.json();
        let pokeName = data.name;
        let pokeImage = data.sprites.other.dream_world.front_default;
        let pokeType = data.types[0].type.name;
        pokeShow(pokeName, pokeImage, pokeType);
    }
}

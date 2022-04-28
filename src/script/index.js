const URL = "https://pokeapi.co/api/v2/pokemon/";

document.querySelector("#pokeButton").addEventListener("click", pokeButton);
document.addEventListener("DOMContentLoaded", pokeButton);

let container = document.querySelector("#container");

function pokeButton() {
    let random = Math.floor(Math.random() * 251) + 1;
    console.log(random);
    catchEmAll(random);
}

function pokeShow(pokeName, pokeImg, pokeType) {
    //limpio el container
    container.innerHTML = "";

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
    img.src = pokeImg;
    card.appendChild(img);
	img.className = "card-img";

    //creo el tipo
	let typeTag = document.createElement("p");
	typeTag.innerText = "TYPE:";
	typeTag.className = "card-typeTag";
    let type = document.createElement("p");
    type.innerText = pokeType.toUpperCase();
	//card.appendChild(typeTag);
    card.appendChild(type);
	type.className = "card-type";

    //pego todo en el container
    container.appendChild(card);
}

function catchEmAll(random) {
    fetch(URL + random)
        .then((res) => res.json())
        .then((data) => {
            let pokeImage = data.sprites.other.dream_world.front_default;
            let pokeName = data.name;
            let pokeType = data.types[0].type.name;

            pokeShow(pokeName, pokeImage, pokeType);
        });
}

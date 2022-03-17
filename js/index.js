import "./charts.js";
import { setImage, setPokemon } from "./pokedex.js";

const $form = document.querySelector("#pokemon-form");
const $next = document.querySelector("#next-pokemon");
const $prev = document.querySelector("#prev-pokemon");
const $nextImage = document.querySelector("#next-image");
const $prevImage = document.querySelector("#prev-image");

$form.addEventListener("submit", submitForm);
$next.addEventListener("click", nextPokemon);
$prev.addEventListener("click", prevPokemon);
$nextImage.addEventListener("click", nextImage);
$prevImage.addEventListener("click", prevImage);

let actualPokemon = null;
async function submitForm(event) {
  event.preventDefault();
  const form = new FormData($form);
  const id = form.get("pokemon-id");
  actualPokemon = await setPokemon(id);
}

async function nextPokemon() {
  const id =
    actualPokemon === null || actualPokemon.id === 893
      ? 1
      : actualPokemon.id + 1;
  actualPokemon = await setPokemon(id);
}

async function prevPokemon() {
  const id =
    actualPokemon === null || actualPokemon.id === 1
      ? 893
      : actualPokemon.id - 1;
  actualPokemon = await setPokemon(id);
}

let activeSprite = 0;
function nextImage() {
  if (actualPokemon === null) return false;
  if (activeSprite >= actualPokemon.sprites.length - 1) {
    activeSprite = 0;
    return setImage(actualPokemon.sprites[activeSprite]);
  }
  activeSprite = activeSprite + 1;
  return setImage(actualPokemon.sprites[activeSprite]);
}
function prevImage() {
  if (actualPokemon === null) return false;
  if (activeSprite <= 0) {
    activeSprite = actualPokemon.sprites.length - 1;
    return setImage(actualPokemon.sprites[activeSprite]);
  }
  activeSprite = activeSprite - 1;
  return setImage(actualPokemon.sprites[activeSprite]);
}

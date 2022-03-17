import { getPokemon, getSpecies } from "./api.js";
import { createChart } from "./charts.js";

const $pokemonImg = document.querySelector("#pokemon-img");
const $description = document.querySelector("#description");
const $screen = document.querySelector("#screen-content");
const $speaker = document.querySelector("#speaker");
const $statusBlue = document.querySelector(".status-blue");
const $statusRed = document.querySelector(".status-red");
const $statsContainer = document.querySelector(".stats-container");

function loader(isLoading = false) {
  $pokemonImg.src = "";
  const img = isLoading ? "url(./img/loader.gif)" : "";
  const backgroundColor = isLoading ? "#181817" : "#f1f1d3";
  $screen.style.backgroundImage = img;
  $screen.style.backgroundColor = backgroundColor;
}

export async function findPokemon(id) {
  $statusBlue.classList.add("is-active");
  $statusRed.classList.add("is-active");

  const pokemon = await getPokemon(id);
  const species = await getSpecies(id);
  const description = species.flavor_text_entries.find(
    (flavor) => flavor.language.name === "es"
  );
  const sprites = [pokemon.sprites.front_default];
  const stats = pokemon.stats.map((item) => item.base_stat);

  for (const item in pokemon.sprites) {
    if (
      item !== "front_default" &&
      item !== "other" &&
      item !== "versions" &&
      pokemon.sprites[item]
    ) {
      sprites.push(pokemon.sprites[item]);
    }
  }

  $statusBlue.classList.remove("is-active");
  $statusRed.classList.remove("is-active");
  $statsContainer.classList.add("slide-down");

  return {
    sprites,
    description: description.flavor_text,
    id: pokemon.id,
    name: pokemon.name,
    stats,
  };
}

export function setImage(image) {
  $pokemonImg.src = image;
}

function setDescription(text) {
  $description.textContent = text;
}

function speech(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es";
  speechSynthesis.speak(utterance);
  $speaker.classList.add("is-animated");

  utterance.addEventListener("end", () => {
    $speaker.classList.remove("is-animated");
  });
}

let activeChart = null;
export async function setPokemon(id) {
  loader(true);
  const pokemon = await findPokemon(id);
  loader(false);

  setImage(pokemon.sprites[0]);
  setDescription(pokemon.description);
  speech(`${pokemon.name}. ${pokemon.description}`);
  if (activeChart instanceof Chart) {
    activeChart.destroy();
  }
  activeChart = createChart(pokemon.stats);
  return pokemon;
}

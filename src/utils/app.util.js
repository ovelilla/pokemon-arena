// Vendors
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const cn = (...inputs) => twMerge(clsx(inputs));

const compactPokemon = (pokemon) => ({
  id: pokemon.id,
  name: pokemon.name,
  types: pokemon.types,
  stats: pokemon.stats,
  sprite: pokemon.sprites.other["official-artwork"].front_default,
});

const getIdFromUrl = (url) =>
  parseInt(url.split("/").filter(Boolean).pop(), 10);

const padNumber = (num, size) => num.toString().padStart(size, "0");

export { capitalize, cn, compactPokemon, getIdFromUrl, padNumber };

// API
import { fetchPokedexNational } from "../api/fetch-pokedex-national.api";
import { fetchPokemonById } from "../api/fetch-pokemon-by-id.api";
import { fetchPokemonsByType } from "../api/fetch-pokemons-by-type.api";
// Contants
import { LIMIT } from "../constants/use-pokemon-list.constants";
// Utils
import { getIdFromUrl } from "@/utils/app.util";

const getUniquePokemons = (pokemons) => [
  ...new Map(pokemons.map((pokemon) => [pokemon.name, pokemon])).values(),
];

const sortPokemonsById = (pokemons) =>
  pokemons.sort((a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url));

const filterPokemonsByName = (pokemons, searchText) =>
  pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase()),
  );

const fetchPaginatedPokemons = async ({ pageParam = 0, queryKey }) => {
  const [, searchText, selectedTypes] = queryKey;

  const national = await fetchPokedexNational();

  const pokemonsByType = selectedTypes.length
    ? (await Promise.all(selectedTypes.map(fetchPokemonsByType))).flat()
    : national;

  const uniquePokemons = selectedTypes.length
    ? getUniquePokemons(pokemonsByType)
    : national;
  const sortedPokemons = selectedTypes.length
    ? sortPokemonsById(uniquePokemons)
    : national;
  const filteredPokemons = searchText
    ? filterPokemonsByName(sortedPokemons, searchText)
    : sortedPokemons;

  const pageEntries = filteredPokemons.slice(pageParam, pageParam + LIMIT);
  const ids = pageEntries.map((e) => getIdFromUrl(e.url));
  const pokemons = await Promise.all(ids.map(fetchPokemonById));

  return {
    pokemons,
    nextOffset:
      pageParam + LIMIT < filteredPokemons.length ? pageParam + LIMIT : null,
  };
};

export { fetchPaginatedPokemons };

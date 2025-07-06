const fetchPokedexNational = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokedex/national");
  if (!res.ok) {
    throw new Error("Failed to fetch Pokedex National");
  }
  const data = await res.json();
  return data.pokemon_entries.map((pokemon) => pokemon.pokemon_species);
};

export { fetchPokedexNational };

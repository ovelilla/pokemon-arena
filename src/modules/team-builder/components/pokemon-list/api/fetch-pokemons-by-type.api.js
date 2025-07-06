const fetchPokemonsByType = async (type) => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch pokemons by type ${type}`);
  }
  const data = await res.json();
  return data.pokemon.map((pokemon) => pokemon.pokemon);
};

export { fetchPokemonsByType };

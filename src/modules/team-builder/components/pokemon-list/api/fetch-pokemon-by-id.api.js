const fetchPokemonById = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon ${id}`);
  return res.json();
};

export { fetchPokemonById };

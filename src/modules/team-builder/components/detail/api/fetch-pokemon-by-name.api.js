const fetchPokemonByName = async (name) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) {
    throw new Error("Failed to fetch pokemon");
  }
  const data = await res.json();
  return data;
};

export { fetchPokemonByName };

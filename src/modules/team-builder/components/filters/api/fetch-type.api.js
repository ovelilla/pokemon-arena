const fetchTypes = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon types");
  }
  return res.json();
};

export { fetchTypes };

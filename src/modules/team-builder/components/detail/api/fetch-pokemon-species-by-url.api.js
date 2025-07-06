const fetchPokemonSpeciesByUrl = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch pokemon species");
  }
  const data = await res.json();
  return data;
};

export { fetchPokemonSpeciesByUrl };

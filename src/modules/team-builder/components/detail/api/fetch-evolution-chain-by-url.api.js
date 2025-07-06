const fetchEvolutionChainByUrl = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch pokemon evolution chain");
  }
  const data = await res.json();
  return data;
};

export { fetchEvolutionChainByUrl };

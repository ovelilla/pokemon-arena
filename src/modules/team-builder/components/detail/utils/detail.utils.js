const flattenEvolutionChain = (chainNode, acc = []) => {
  acc.push({
    level: chainNode.evolution_details?.[0]?.min_level ?? null,
    name: chainNode.species.name,
    url: chainNode.species.url,
  });

  chainNode.evolves_to.forEach((n) => flattenEvolutionChain(n, acc));
  return acc;
};

const getTypeIconMono = (name) =>
  new URL(`../../../../../assets/types/${name}.svg`, import.meta.url).href;

export { flattenEvolutionChain, getTypeIconMono };

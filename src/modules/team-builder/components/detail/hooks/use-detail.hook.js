// Vendors
import { useQuery } from "@tanstack/react-query";
import { useScrollLock } from "usehooks-ts";
// API
import { fetchEvolutionChainByUrl } from "../api/fetch-evolution-chain-by-url.api";
import { fetchPokemonSpeciesByUrl } from "../api/fetch-pokemon-species-by-url.api";
import { fetchPokemonByName } from "../api/fetch-pokemon-by-name.api";
import { fetchTypeByUrl } from "../api/fetch-type-by-url.api";
// Stores
import { useDetailStore } from "@/stores/detail/detail.store";
// Utils
import { flattenEvolutionChain } from "../utils/detail.utils";

const useDetail = () => {
  const { close, isOpen, pokemon } = useDetailStore();

  const {
    data: pokemonSpecies,
    isLoading: pokemonSpeciesIsLoading,
    isError: pokemonSpeciesIsError,
  } = useQuery({
    enabled: !!pokemon?.species,
    queryFn: () => fetchPokemonSpeciesByUrl(pokemon?.species.url),
    queryKey: ["species", pokemon?.species],
    staleTime: 1000 * 60 * 10,
  });

  const {
    data: pokemonTypes,
    isLoading: pokemonTypesIsLoading,
    isError: pokemonTypesIsError,
  } = useQuery({
    queryKey: ["types", pokemon?.types],
    queryFn: () =>
      Promise.all(pokemon?.types.map((type) => fetchTypeByUrl(type.type.url))),
    staleTime: 1000 * 60 * 10,
    enabled: !!pokemon?.types,
  });

  const {
    data: pokemonEvolutionChain,
    isLoading: pokemonEvolutionChainIsLoading,
    isError: pokemonEvolutionChainIsError,
  } = useQuery({
    queryKey: ["evolutionChain", pokemonSpecies?.evolution_chain],
    queryFn: () =>
      fetchEvolutionChainByUrl(pokemonSpecies?.evolution_chain.url),
    staleTime: 1000 * 60 * 10,
    enabled: !!pokemonSpecies?.evolution_chain,
  });

  const {
    data: pokemonEvolutions,
    isLoading: pokemonEvolutionsIsLoading,
    isError: pokemonEvolutionsIsError,
  } = useQuery({
    queryKey: ["pokemon-evolutions", pokemonEvolutionChain?.id],
    enabled: !!pokemonEvolutionChain?.chain,
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      console.log("pokemonEvolutionChain", pokemonEvolutionChain);
      const evolutions = flattenEvolutionChain(pokemonEvolutionChain.chain);
      console.log("evolutions", evolutions);

      const pokemonEvolutions = await Promise.all(
        evolutions.map((e) => fetchPokemonByName(e.name)),
      );

      return {
        evolutions,
        pokemonEvolutions,
      };
    },
  });

  const isLoading =
    pokemonSpeciesIsLoading ||
    pokemonTypesIsLoading ||
    pokemonEvolutionChainIsLoading ||
    pokemonEvolutionsIsLoading;
  const isError =
    pokemonSpeciesIsError ||
    pokemonTypesIsError ||
    pokemonEvolutionChainIsError ||
    pokemonEvolutionsIsError;

  useScrollLock();

  return {
    close,
    evolutions: pokemonEvolutions?.evolutions,
    isError,
    isLoading,
    isOpen,
    pokemon,
    pokemonEvolutions: pokemonEvolutions?.pokemonEvolutions,
    pokemonSpecies,
    pokemonTypes,
  };
};

export { useDetail };

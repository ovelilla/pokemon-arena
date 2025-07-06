// Vendors
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
// Stores
import { useFiltersStore } from "@/stores/filters/filters.store";
import { useSearchStore } from "@/stores/search/search.store";
import { useTeamsStore } from "@/stores/teams/teams.store";
// Utils
import { fetchPaginatedPokemons } from "../utils/pokemon-list.utils";

const usePokemonList = () => {
  const loaderRef = useRef(null);
  const { searchText } = useSearchStore();
  const { selectedTypes } = useFiltersStore();
  const { addPokemonToTeam } = useTeamsStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["pokedex", searchText, selectedTypes],
    queryFn: fetchPaginatedPokemons,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    staleTime: 1000 * 60 * 10,
  });

  const pokemons = data?.pages.flatMap((page) => page.pokemons) ?? [];

  useEffect(() => {
    const loader = loaderRef.current;
    if (!hasNextPage || !loader) return;

    const hasVerticalScroll = document.body.scrollHeight > window.innerHeight;
    if (!hasVerticalScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(loader);

    return () => observer.unobserve(loader);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, pokemons.length]);

  return {
    addPokemonToTeam,
    hasMore: hasNextPage,
    isError,
    isFetchingMore: isFetchingNextPage,
    isLoadingInitial: isLoading,
    loaderRef,
    pokemons,
  };
};

export { usePokemonList };

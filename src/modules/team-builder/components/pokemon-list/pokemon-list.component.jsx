// Assets
import pokeball from "@/assets/pokeball.svg";
// Components
import { PokemonCard } from "./components/pokemon-card/pokemon-card.component";
// Hooks
import { usePokemonList } from "./hooks/usePokemonList.hook";

const PokemonListComponent = () => {
  const {
    pokemons,
    hasMore,
    isFetchingMore,
    isLoadingInitial,
    isError,
    loaderRef,
  } = usePokemonList();

  if (isLoadingInitial) return <p>Loading Pokémon…</p>;
  if (isError) return <p>Error loading Pokémon list</p>;
  if (!pokemons.length) return <p>No items found…</p>;

  return (
    <div className="col-span-3 flex w-full flex-1 flex-col items-center gap-4 lg:col-span-1">
      <ul className="grid w-full list-none grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
      <div ref={loaderRef} className="flex w-full justify-center py-4">
        {isFetchingMore && hasMore && (
          <span className="animate-spin">
            <img src={pokeball} alt="Loading…" width={72} height={72} />
          </span>
        )}
        {!hasMore && !isFetchingMore && (
          <span className="text-gray-500">No more Pokémon to load</span>
        )}
      </div>
    </div>
  );
};

export { PokemonListComponent };

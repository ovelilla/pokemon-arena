// Components
import { IconButton } from "@/components/icon-button/icon-button.component";
import { Type } from "@/components/type/type.component";
// Constants
import { TYPE_BG_CLASSES, TYPE_MUTED_CLASSES } from "@/constants/app.constants";
// Icons
import { Ellipsis } from "lucide-react";
// Stores
import { useDetailStore } from "@/stores/detail/detail.store";
import { useTeamsStore } from "@/stores/teams/teams.store";
// Utils
import { capitalize, cn, padNumber } from "@/utils/app.util";
import { getTypeIconMono } from "./utils/pokemon-card.util";

const PokemonCard = ({ pokemon }) => {
  const { open } = useDetailStore();
  const { addPokemonToTeam } = useTeamsStore();

  return (
    <li
      key={pokemon.id}
      className={cn(
        "flex cursor-pointer overflow-hidden rounded-2xl",
        TYPE_MUTED_CLASSES[pokemon.types[0].type.name],
      )}
      onClick={() => addPokemonToTeam(pokemon)}
    >
      <div className="relative flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold text-[var(--text)]">
          {`No. ${padNumber(pokemon.id, 3)}`}
        </span>
        <h2 className="text-2xl font-semibold text-[var(--text)]">
          {capitalize(pokemon.name)}
        </h2>
        <ul className="mt-auto flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <li key={type.type.name}>
              <Type type={type.type} />
            </li>
          ))}
        </ul>
        <IconButton
          className="absolute top-2 right-2 bg-transparent"
          ariaLabel="More info"
          onClick={(e) => {
            e.stopPropagation();
            open(pokemon);
          }}
        >
          <Ellipsis className="size-6 text-[var(--text-muted)]" />
        </IconButton>
      </div>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-2xl p-4",
          TYPE_BG_CLASSES[pokemon.types[0].type.name],
        )}
      >
        <img
          src={getTypeIconMono(pokemon.types[0].type.name)}
          alt={`${pokemon.types[0].type.name} type background`}
          className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 md:h-32 md:w-32"
        />
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={112}
          height={112}
          loading="lazy"
          className="relative z-10 h-20 w-20 md:h-28 md:w-28"
        />
      </div>
    </li>
  );
};

export { PokemonCard };

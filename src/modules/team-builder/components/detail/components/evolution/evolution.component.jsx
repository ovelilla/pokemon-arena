// Components
import { Type } from "@/components/type/type.component";
// Constants
import { BG_CLASSES, BG_MUTED_CLASSES } from "../../constants/detail.constants";
// Utils
import { capitalize, cn, padNumber } from "@/utils/app.util";
import { getTypeIconMono } from "../../utils/detail.utils";

const Evolution = ({ pokemon }) => {
  const primaryType = pokemon.types?.[0]?.type?.name ?? "normal";

  return (
    <li
      className={cn(
        "flex overflow-hidden rounded-[128px]",
        BG_MUTED_CLASSES[primaryType],
      )}
    >
      <div
        className={cn(
          "color--solid--${primaryType} relative flex h-[88px] w-[88px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full",
          BG_CLASSES[primaryType],
        )}
      >
        <img
          src={getTypeIconMono(pokemon.types[0].type.name)}
          alt={`${pokemon.types[0].type.name} type background`}
          className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src={
            pokemon.sprites?.other["official-artwork"].front_default ||
            pokemon.sprites?.front_default
          }
          alt={pokemon.name}
          width={128}
          height={128}
          loading="lazy"
          className="z-20 h-14 w-14"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2 px-4">
        <h2 className="text-base leading-4 font-semibold text-gray-800 dark:text-gray-100">
          {capitalize(pokemon.name)}
        </h2>
        <span className="text-sm leading-3.5 font-medium text-gray-600 dark:text-gray-300">
          No. {padNumber(pokemon.id, 3)}
        </span>
        <ul className="mt-auto flex flex-wrap gap-2">
          {pokemon.types.map((t) => (
            <Type key={t.type.name} type={t.type} className="w-auto" />
          ))}
        </ul>
      </div>
    </li>
  );
};

export { Evolution };

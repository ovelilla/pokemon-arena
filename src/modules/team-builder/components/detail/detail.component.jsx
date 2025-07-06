// Vendor
import { Fragment } from "react";
// Components
import { Evolution } from "./components/evolution/evolution.component";
import { GridStat } from "./components/grid-stat/grid-stat.component";
import { IconButton } from "@/components/icon-button/icon-button.component";
import { Type } from "@/components/type/type.component";
// Constants
import {
  DAMAGES,
  GIRD_ITEMS,
  HEADER_FROM_CLASSES,
} from "./constants/detail.constants";
// Hooks
import { useDetail } from "./hooks/use-detail.hook";
// Icons
import { ArrowDown, X } from "lucide-react";
// Utils
import { capitalize, cn, padNumber } from "@/utils/app.util";

const DetailComponent = () => {
  const {
    close,
    evolutions,
    isError,
    isLoading,
    isOpen,
    pokemon,
    pokemonEvolutions,
    pokemonSpecies,
    pokemonTypes,
  } = useDetail();

  if (!pokemon || isLoading || isError) return null;

  return (
    <div
      className={cn(
        "invisible fixed inset-0 z-50 flex h-dvh w-full items-center justify-center bg-[var(--overlay-background)]",
        isOpen && "visible",
      )}
      onClick={close}
    >
      <div
        className="relative flex h-full w-full flex-col overflow-hidden bg-[var(--container-background)] lg:max-w-[480px] lg:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          className="absolute top-4 right-4 z-50 bg-transparent"
          onClick={close}
        >
          <X className="h-6 w-6" />
        </IconButton>

        <div className="relative h-32 flex-shrink-0 sm:h-36">
          <div
            className={cn(
              "absolute bottom-6 left-1/2 z-10 aspect-square w-[200%] -translate-x-1/2 rounded-full bg-linear-[135deg] from-[var(--bug)] to-[rgba(255,255,255,0)]",
              HEADER_FROM_CLASSES[pokemon.types[0].type.name],
            )}
          />
          <img
            src={
              pokemon.sprites?.other["official-artwork"].front_default ||
              pokemon.sprites?.front_default
            }
            alt={pokemon.name}
            className="absolute bottom-0 left-1/2 z-20 h-28 w-28 -translate-x-1/2 sm:h-32 sm:w-32"
          />
        </div>

        <section className="flex flex-col gap-6 overflow-auto p-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              No. {padNumber(pokemon.id, 3)}
            </span>
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
              {capitalize(pokemon.name)}
            </h2>
          </div>

          <ul className="flex flex-wrap gap-2">
            {pokemon.types.map((t) => (
              <Type key={t.type.name} type={t.type} className="w-auto" />
            ))}
          </ul>

          <p className="text-base leading-relaxed text-[var(--text)]">
            {pokemonSpecies.flavor_text_entries?.[0]?.flavor_text.replace(
              /\f/g,
              " ",
            )}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {GIRD_ITEMS.map(({ name, text, icon: Icon, unit }) => (
              <GridStat
                key={name}
                Icon={Icon}
                label={text}
                value={`${pokemon[name] / 10} ${unit}`}
              />
            ))}
          </div>

          {DAMAGES.map(({ titleText, relationType }) => (
            <div key={relationType} className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-[var(--text)]">
                {titleText}
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {pokemonTypes.flatMap((t) =>
                  t.damage_relations[relationType].map((rel) => (
                    <Type
                      key={`${relationType}-${rel.name}`}
                      type={{ name: rel.name }}
                    />
                  )),
                )}
              </div>
            </div>
          ))}

          {pokemonEvolutions?.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-[var(--text)]">
                Evolutions
              </h3>

              <div className="flex flex-col gap-2">
                {pokemonEvolutions.map((poke, idx) => (
                  <Fragment key={poke.id}>
                    <Evolution pokemon={poke} />
                    {evolutions[idx + 1] && (
                      <div className="flex items-center justify-center gap-2">
                        <ArrowDown className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          Level {evolutions[idx + 1].level}
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export { DetailComponent };

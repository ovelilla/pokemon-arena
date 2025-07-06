// Components
import { SlotComponent } from "./components/slot/slot.component";
// Hooks
import { useTeam } from "./hooks/use-team.hook";
// Stores
import { useSimulatorStore } from "@/stores/simulator/simulator.store";
// Utils
import { cn } from "@/utils/app.util";

const TeamComponent = ({ isArena = false, team }) => {
  const { handleSelect, isSelected } = useTeam({ team });

  const { battleLog } = useSimulatorStore();

  return (
    <div
      key={team.id}
      className={cn(
        "flex cursor-pointer flex-col gap-2 rounded-md border-2 p-1",
        isSelected && !isArena ? "border-slate-300" : "border-transparent",
      )}
      onClick={handleSelect}
    >
      {!isArena && (
        <div className="flex items-center justify-between gap-4">
          <span className="w-full cursor-text truncate overflow-hidden rounded bg-transparent px-2 py-1 whitespace-nowrap text-[var(--text)] ring-offset-0 outline-none focus:ring-2 focus:ring-slate-300">
            {team.name}
          </span>
        </div>
      )}
      <div className="grid touch-none grid-cols-6">
        {team.pokemons.map((pokemon, i) => {
          const isFainted =
            battleLog?.some((entry) => entry.fainted === pokemon?.name) &&
            isArena;

          return (
            <SlotComponent
              key={pokemon?.id ?? `empty-${i}`}
              pokemon={pokemon}
              isFainted={isFainted}
            />
          );
        })}
      </div>
    </div>
  );
};

export { TeamComponent };

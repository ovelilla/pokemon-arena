// Assets
import pokeball from "@/assets/pokeball.svg";
// Components
import { TeamComponent } from "../teams/components/team/team.component";
// Stores
import { useSimulatorStore } from "@/stores/simulator/simulator.store";

const ArenaComponent = () => {
  const { selected } = useSimulatorStore();

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border-4 border-slate-300 dark:border-slate-500">
      <div className="flex flex-1 items-center">
        {selected[0] && <TeamComponent isArena={true} team={selected[0]} />}
      </div>
      <div className="relative border-b-4 border-slate-300 dark:border-slate-500">
        <img
          src={pokeball}
          alt="Pokeball"
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          width={96}
          height={96}
        />
      </div>
      <div className="flex flex-1 items-center">
        {selected[1] && <TeamComponent isArena={true} team={selected[1]} />}
      </div>
    </div>
  );
};

export { ArenaComponent };

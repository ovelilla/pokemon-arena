// Components
import { ArenaComponent } from "./components/arena/arena.component";
import { TeamsComponent } from "./components/teams/teams.component";

const SimulatorPage = () => {
  return (
    <div className="flex flex-1 justify-center">
      <div className="w- grid w-full max-w-[var(--maxWidth)] gap-4 px-4 lg:grid-cols-[400px_1fr]">
        <TeamsComponent />
        <ArenaComponent />
      </div>
    </div>
  );
};

export default SimulatorPage;

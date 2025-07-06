// Components
import { Button } from "@/components/button/button.component";
import { IconButton } from "@/components/icon-button/icon-button.component";
import { TeamComponent } from "./components/team/team.component";
// Icons
import { Swords, Shield, X } from "lucide-react";
// Stores
import { useSimulatorStore } from "@/stores/simulator/simulator.store";
import { useTeamsStore } from "@/stores/teams/teams.store";
// Utils
import { cn } from "@/utils/app.util";

const TeamsComponent = () => {
  const { close, isOpen, teams } = useTeamsStore();
  const { simulateBattle, resetBattle } = useSimulatorStore();

  return (
    <div
      className={cn(
        "invisible fixed inset-0 z-[110] h-dvh w-full self-start bg-[var(--overlay-background)] lg:visible lg:sticky lg:top-20 lg:h-auto lg:bg-transparent",
        isOpen && "visible",
      )}
      onClick={close}
    >
      <div
        className="flex h-full w-full max-w-[400px] flex-col gap-6 overflow-auto bg-[var(--container-background)] p-4 lg:max-h-[calc(100dvh-96px)] lg:translate-x-0 lg:rounded-2xl lg:shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="flex flex-1 items-center justify-between gap-2 text-2xl font-semibold text-[var(--text)]">
            <span>Teams</span>
            <Shield className="h-5 w-5" />
          </h3>

          <IconButton className="lg:hidden" onClick={close}>
            <X className="h-6 w-6" />
          </IconButton>
        </div>

        <div className="flex flex-col gap-4">
          {teams.map((team) => (
            <TeamComponent key={team.id} team={team} />
          ))}
        </div>

        <Button variant="primary" fullWidth onClick={simulateBattle}>
          <Swords className="h-5 w-5" />
          <span>Fight</span>
        </Button>

        <Button variant="outline" fullWidth onClick={resetBattle}>
          <span>Reset</span>
        </Button>
      </div>
    </div>
  );
};

export { TeamsComponent };

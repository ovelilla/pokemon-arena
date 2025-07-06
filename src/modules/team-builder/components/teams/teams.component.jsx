// Components
import { Button } from "@/components/button/button.component";
import { IconButton } from "@/components/icon-button/icon-button.component";
import { TeamComponent } from "./components/team/team.component";
// Hooks
import { useTeams } from "./hooks/use-teams.hook";
// Icons
import { Plus, Shield, X } from "lucide-react";
// Utils
import { cn } from "@/utils/app.util";

const TeamsComponent = () => {
  const { addTeam, close, isOpen, draftTeam, savedTeams } = useTeams();

  return (
    <div
      className={cn(
        "invisible fixed inset-0 z-30 row-span-3 h-dvh w-full self-start bg-[var(--overlay-background)] lg:visible lg:sticky lg:top-20 lg:h-auto lg:bg-transparent",
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
          {draftTeam && (
            <div className="flex flex-col gap-2">
              <h4 className="text-base font-semibold text-[var(--text)]">
                Draft team
              </h4>
              <TeamComponent team={draftTeam} />
            </div>
          )}

          <div className="flex flex-col gap-4">
            {savedTeams.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="text-base font-semibold text-[var(--text)]">
                  Saved teams
                </h4>
                {savedTeams.map((team) => (
                  <TeamComponent key={team.id} team={team} />
                ))}
              </div>
            )}
          </div>
        </div>

        <Button variant="primary" fullWidth onClick={() => addTeam()}>
          <Plus className="h-5 w-5" />
          <span>New team</span>
        </Button>
      </div>
    </div>
  );
};

export { TeamsComponent };

// Vendors
// API
// Stores
import { useTeamsStore } from "@/stores/teams/teams.store";

const useTeams = () => {
  const { addTeam, close, isOpen, teams } = useTeamsStore();

  const draftTeam = teams.find((team) => team.isDraft);
  const savedTeams = teams.filter((team) => !team.isDraft);

  return {
    addTeam,
    close,
    isOpen,
    draftTeam,
    savedTeams,
  };
};

export { useTeams };

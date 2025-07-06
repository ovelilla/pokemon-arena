// Handlers
import { SlotHandlers } from "../handlers/slot.handlers";
// Stores
import { useTeamsStore } from "@/stores/teams/teams.store";

const useSlot = ({ pokemon, team }) => {
  const { removePokemonFromTeam } = useTeamsStore();

  const { handleClick } = SlotHandlers({
    pokemon,
    removePokemonFromTeam,
    team,
  });

  return {
    handleClick,
  };
};

export { useSlot };

// Handlers
import { TeamHandlers } from "../handlers/team.handlers";
// Stores
import { useSimulatorStore } from "@/stores/simulator/simulator.store";

const useTeam = ({ team }) => {
  const { selected, toggleTeam } = useSimulatorStore();
  const isSelected = selected.some((t) => t.id === team.id);

  return {
    handleSelect: () => toggleTeam(team),
    isSelected,
  };
};

export { useTeam };

// Vendors
import { useState } from "react";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
// Handlers
import { TeamHandlers } from "../handlers/team.handlers";
// Stores
import { useTeamsStore } from "@/stores/teams/teams.store";

const useTeam = ({ team }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(team.name);

  const { markTeamAsSaved, removeTeam, reorderTeamPokemons, updateTeamName } =
    useTeamsStore();

  const sensors = useSensors(useSensor(PointerSensor));
  const ids = team.pokemons.map((pokemon, index) => pokemon?.id ?? index);

  const {
    handleBlur,
    handleChange,
    handleClick,
    handleDiscard,
    handleDragEnd,
    handleKeyDown,
    handleRandomize,
    handleSave,
    handleSort,
  } = TeamHandlers({
    ids,
    markTeamAsSaved,
    removeTeam,
    reorderTeamPokemons,
    setIsEditing,
    setTempName,
    team,
    tempName,
    updateTeamName,
  });

  return {
    handleBlur,
    handleChange,
    handleClick,
    handleDiscard,
    handleDragEnd,
    handleKeyDown,
    handleRandomize,
    handleSave,
    handleSort,
    ids,
    isEditing,
    sensors,
    tempName,
  };
};

export { useTeam };

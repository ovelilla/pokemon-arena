// Vendors
import { arrayMove } from "@dnd-kit/sortable";

const handleBlur = ({ setIsEditing, team, tempName, updateTeamName }) => {
  updateTeamName(team.id, tempName.trim() || "New team");
  setIsEditing(false);
};

const handleChange = ({ e, setTempName }) => {
  setTempName(e.target.value);
};

const handleClick = ({ setIsEditing }) => {
  setIsEditing(true);
};

const handleDiscard = ({ removeTeam, team }) => {
  removeTeam(team.id);
};

const handleDragEnd = ({ e, ids, reorderTeamPokemons, team }) => {
  const { active, over } = e;

  if (!over || active.id === over.id) return;

  const oldIndex = ids.indexOf(active.id);
  const newIndex = ids.indexOf(over.id);

  if (oldIndex === -1 || newIndex === -1) return;

  const newOrder = arrayMove(team.pokemons, oldIndex, newIndex);
  reorderTeamPokemons(team.id, newOrder);
};

const handleKeyDown = ({ e, setIsEditing, team, setTempName }) => {
  if (e.key === "Enter") {
    e.currentTarget.blur();
  }
  if (e.key === "Escape") {
    setTempName(team.name);
    setIsEditing(false);
  }
};

const handleRandomize = ({ reorderTeamPokemons, team }) => {
  const filled = team.pokemons.filter(Boolean);
  const shuffled = filled.sort(() => Math.random() - 0.5);

  const newOrder = [...shuffled, ...Array(6 - shuffled.length).fill(undefined)];
  reorderTeamPokemons(team.id, newOrder);
};

const handleSave = ({ markTeamAsSaved, team }) => {
  markTeamAsSaved(team.id);
};

const handleSort = ({ reorderTeamPokemons, team }) => {
  const filled = team.pokemons.filter(Boolean);

  const sorted = [...filled].sort((a, b) => {
    const attackA =
      a.stats.find((s) => s.stat.name === "attack")?.base_stat ?? 0;
    const attackB =
      b.stats.find((s) => s.stat.name === "attack")?.base_stat ?? 0;
    return attackB - attackA;
  });

  const newOrder = [...sorted, ...Array(6 - sorted.length).fill(undefined)];
  reorderTeamPokemons(team.id, newOrder);
};

const TeamHandlers = ({
  ids,
  markTeamAsSaved,
  removeTeam,
  reorderTeamPokemons,
  setIsEditing,
  setTempName,
  team,
  tempName,
  updateTeamName,
}) => {
  return {
    handleBlur: () =>
      handleBlur({ setIsEditing, team, tempName, updateTeamName }),
    handleChange: (e) => handleChange({ e, setTempName }),
    handleClick: () => handleClick({ setIsEditing }),
    handleDiscard: () => handleDiscard({ removeTeam, team }),
    handleDragEnd: (e) => handleDragEnd({ e, ids, reorderTeamPokemons, team }),
    handleKeyDown: (e) => handleKeyDown({ e, setIsEditing, team, setTempName }),
    handleRandomize: () => handleRandomize({ reorderTeamPokemons, team }),
    handleSave: () => handleSave({ markTeamAsSaved, team }),
    handleSort: () => handleSort({ reorderTeamPokemons, team }),
  };
};

export { TeamHandlers };

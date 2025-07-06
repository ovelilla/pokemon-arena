const handleClick = ({ pokemon, removePokemonFromTeam, team }) => {
  removePokemonFromTeam(team.id, pokemon.id);
};

const SlotHandlers = ({ pokemon, removePokemonFromTeam, team }) => {
  return {
    handleClick: () => handleClick({ pokemon, removePokemonFromTeam, team }),
  };
};

export { SlotHandlers };

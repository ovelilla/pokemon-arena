const handleSelect = ({ teamAId, teamBId, setTeamA, setTeamB, team }) => {
  if (teamAId === team.id || teamBId === team.id) return;

  if (!teamAId) {
    setTeamA(team.id);
  } else if (!teamBId) {
    setTeamB(team.id);
  } else {
    setTeamA(team.id);
    setTeamB(null);
  }
};

const TeamHandlers = ({ teamAId, teamBId, setTeamA, setTeamB, team }) => {
  return {
    handleSelect: () =>
      handleSelect({ teamAId, teamBId, setTeamA, setTeamB, team }),
  };
};

export { TeamHandlers };

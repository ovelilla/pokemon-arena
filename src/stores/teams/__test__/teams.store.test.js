import { renderHook } from "@testing-library/react";
import { useTeamsStore } from "../teams.store";

const makePokemon = (id) => ({
  id,
  name: `Pokemon${id}`,
  types: ["grass"],
  stats: { hp: 45 },
  sprites: { other: { "official-artwork": { front_default: `p${id}.png` } } },
});

beforeEach(() => {
  useTeamsStore.persist.clearStorage();
  useTeamsStore.setState({ isOpen: false, teams: [] });
  localStorage.clear();
});

describe("useTeamsStore", () => {
  it("should open the drawer", () => {
    useTeamsStore.getState().open();
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.isOpen).toBe(true);
  });

  it("should close the drawer", () => {
    useTeamsStore.getState().open();
    useTeamsStore.getState().close();
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.isOpen).toBe(false);
  });

  it("should add a draft team with default name", () => {
    useTeamsStore.getState().addTeam();
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.teams).toHaveLength(1);
    expect(result.current.teams[0].name).toBe("New team");
    expect(result.current.teams[0].isDraft).toBe(true);
    expect(result.current.teams[0].pokemons).toHaveLength(6);
  });

  it("should add a draft team with custom name", () => {
    useTeamsStore.getState().addTeam("Champions");
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.teams[0].name).toBe("Champions");
  });

  it("should not add a second draft team", () => {
    useTeamsStore.getState().addTeam();
    useTeamsStore.getState().addTeam();
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.teams).toHaveLength(1);
  });

  it("should remove a team by id", () => {
    useTeamsStore.getState().addTeam();
    const id = useTeamsStore.getState().teams[0].id;
    useTeamsStore.getState().removeTeam(id);
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.teams).toHaveLength(0);
  });

  it("should add a pokemon to the first empty slot", () => {
    useTeamsStore.getState().addTeam();
    useTeamsStore.getState().addPokemonToTeam(makePokemon(1));
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.teams[0].pokemons[0].id).toBe(1);
  });

  it("should not add duplicate pokemon", () => {
    useTeamsStore.getState().addTeam();
    const pokemon = makePokemon(1);
    useTeamsStore.getState().addPokemonToTeam(pokemon);
    useTeamsStore.getState().addPokemonToTeam(pokemon);
    const { result } = renderHook(() => useTeamsStore());
    const filled = result.current.teams[0].pokemons.filter(Boolean);
    expect(filled).toHaveLength(1);
  });

  it("should not add more than six pokemons", () => {
    useTeamsStore.getState().addTeam();
    for (let i = 1; i <= 7; i++)
      useTeamsStore.getState().addPokemonToTeam(makePokemon(i));
    const { result } = renderHook(() => useTeamsStore());
    const filled = result.current.teams[0].pokemons.filter(Boolean);
    expect(filled).toHaveLength(6);
  });

  it("should remove a pokemon from a team", () => {
    useTeamsStore.getState().addTeam();
    const pokemon = makePokemon(1);
    useTeamsStore.getState().addPokemonToTeam(pokemon);
    const teamId = useTeamsStore.getState().teams[0].id;
    useTeamsStore.getState().removePokemonFromTeam(teamId, 1);
    const { result } = renderHook(() => useTeamsStore());
    const filled = result.current.teams[0].pokemons.filter(Boolean);
    expect(filled).toHaveLength(0);
  });

  it("should clear all pokemons from a team", () => {
    useTeamsStore.getState().addTeam();
    useTeamsStore.getState().addPokemonToTeam(makePokemon(1));
    const teamId = useTeamsStore.getState().teams[0].id;
    useTeamsStore.getState().clearTeam(teamId);
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.teams[0].pokemons).toHaveLength(0);
  });

  it("should mark a team as saved", () => {
    useTeamsStore.getState().addTeam();
    const id = useTeamsStore.getState().teams[0].id;
    useTeamsStore.getState().markTeamAsSaved(id);
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.teams[0].isDraft).toBe(false);
  });

  it("should discard a draft team", () => {
    useTeamsStore.getState().addTeam();
    const id = useTeamsStore.getState().teams[0].id;
    useTeamsStore.getState().discardDraft(id);
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.teams).toHaveLength(0);
  });

  it("should update the team name", () => {
    useTeamsStore.getState().addTeam();
    const id = useTeamsStore.getState().teams[0].id;
    useTeamsStore.getState().updateTeamName(id, "Elite");
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.teams[0].name).toBe("Elite");
  });

  it("should reorder pokemons inside a team", () => {
    useTeamsStore.getState().addTeam();
    const p1 = makePokemon(1);
    const p2 = makePokemon(2);
    useTeamsStore.getState().addPokemonToTeam(p1);
    useTeamsStore.getState().addPokemonToTeam(p2);
    const teamId = useTeamsStore.getState().teams[0].id;
    const newOrder = [p2, p1, undefined, undefined, undefined, undefined];
    useTeamsStore.getState().reorderTeamPokemons(teamId, newOrder);
    const { result } = renderHook(() => useTeamsStore());
    expect(result.current.teams[0].pokemons[0].id).toBe(2);
    expect(result.current.teams[0].pokemons[1].id).toBe(1);
  });
});

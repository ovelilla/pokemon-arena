// Vendors
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid/non-secure";
// Utils
import { compactPokemon } from "@/utils/app.util";

const useTeamsStore = create(
  persist(
    (set) => ({
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),

      teams: [],
      addTeam: (name = "New team") =>
        set((state) => {
          const alreadyDraft = state.teams.some((team) => team.isDraft);
          if (alreadyDraft) return {};
          return {
            teams: [
              ...state.teams,
              {
                id: nanoid(),
                isDraft: true,
                name,
                pokemons: Array(6).fill(undefined),
              },
            ],
          };
        }),
      removeTeam: (id) =>
        set((state) => ({
          teams: state.teams.filter((team) => team.id !== id),
        })),
      addPokemonToTeam: (pokemon) =>
        set((state) => ({
          teams: state.teams.map((team) => {
            if (!team.isDraft) return team;

            const alreadyExists = team.pokemons.some(
              (p) => p?.id === pokemon.id,
            );
            if (alreadyExists) return team;

            const firstEmptyIndex = team.pokemons.findIndex(
              (p) => p === undefined,
            );
            if (firstEmptyIndex === -1) return team;

            const newPokemons = [...team.pokemons];
            newPokemons[firstEmptyIndex] = compactPokemon(pokemon);

            return {
              ...team,
              pokemons: newPokemons,
            };
          }),
        })),

      removePokemonFromTeam: (teamId, pokemonId) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId
              ? {
                  ...team,
                  pokemons: team.pokemons.filter(
                    (p) => !(p && p.id === pokemonId),
                  ),
                }
              : team,
          ),
        })),
      clearTeam: (teamId) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId ? { ...team, pokemons: [] } : team,
          ),
        })),
      markTeamAsSaved: (id) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === id ? { ...team, isDraft: false } : team,
          ),
        })),
      discardDraft: (id) =>
        set((state) => ({
          teams: state.teams.filter(
            (team) => !(team.id === id && team.isDraft),
          ),
        })),
      updateTeamName: (id, name) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === id ? { ...team, name } : team,
          ),
        })),
      reorderTeamPokemons: (teamId, newOrder) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId ? { ...team, pokemons: newOrder } : team,
          ),
        })),
    }),
    {
      name: "teams-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ teams: state.teams }),
    },
  ),
);

export { useTeamsStore };

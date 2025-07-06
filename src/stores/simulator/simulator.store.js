// stores/simulator/simulator.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

const stat = (p, key) =>
  p?.stats.find((s) => s.stat.name === key)?.base_stat ?? 0;

const duel = (a, b) => {
  const speedA = stat(a, "speed");
  const speedB = stat(b, "speed");
  const attackA = stat(a, "attack");
  const attackB = stat(b, "attack");
  const defenseA = stat(a, "defense");
  const defenseB = stat(b, "defense");

  const first = speedA >= speedB ? "A" : "B";
  const second = first === "A" ? "B" : "A";

  if (first === "A" && attackA > defenseB) return "A";
  if (first === "B" && attackB > defenseA) return "B";

  if (second === "A" && attackA > defenseB) return "A";
  if (second === "B" && attackB > defenseA) return "B";

  return first;
};

export const useSimulatorStore = create(
  persist(
    (set) => ({
      selected: [],
      toggleTeam: (team) =>
        set((state) => {
          const already = state.selected.some((t) => t.id === team.id);
          if (already) {
            return { selected: state.selected.filter((t) => t.id !== team.id) };
          }
          if (state.selected.length < 2) {
            return { selected: [...state.selected, team] };
          }
          return { selected: [...state.selected.slice(1), team] };
        }),
      battleLog: [],
      battleResult: null,
      simulateBattle: () =>
        set((state) => {
          if (state.selected.length !== 2) return {};

          const [teamA, teamB] = state.selected;

          const aPokes = teamA.pokemons.filter(Boolean);
          const bPokes = teamB.pokemons.filter(Boolean);

          let i = 0,
            j = 0,
            log = [];

          while (i < aPokes.length && j < bPokes.length) {
            const a = aPokes[i];
            const b = bPokes[j];

            const winner = duel(a, b);

            log.push({
              round: log.length + 1,
              pokemonA: a.name,
              pokemonB: b.name,
              winner: winner === "A" ? a.name : b.name,
              fainted: winner === "A" ? b.name : a.name,
            });

            if (winner === "A") {
              j++;
            } else {
              i++;
            }
          }

          return {
            battleLog: log,
            battleResult: {
              winnerTeamId: i < aPokes.length ? teamA.id : teamB.id,
              remainingA: aPokes.length - i,
              remainingB: bPokes.length - j,
            },
          };
        }),
      resetBattle: () =>
        set(() => ({
          selected: [],
          battleLog: [],
          battleResult: null,
        })),
    }),
    { name: "simulator-store" },
  ),
);

import { create } from 'zustand';
import { Team, Player, MatchResult } from '../types';
import { mockTeams } from '../data/mockData';

interface GameState {
  teams: Team[];
  selectedHomeTeam: Team | null;
  selectedAwayTeam: Team | null;
  currentMatchResult: MatchResult | null;
  isSimulating: boolean;
  updateTeamPlayers: (teamId: string, players: Player[]) => void;
  selectHomeTeam: (team: Team) => void;
  selectAwayTeam: (team: Team) => void;
  setMatchResult: (result: MatchResult | null) => void;
  setIsSimulating: (isSimulating: boolean) => void;
  resetSelection: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  teams: mockTeams,
  selectedHomeTeam: null,
  selectedAwayTeam: null,
  currentMatchResult: null,
  isSimulating: false,

  updateTeamPlayers: (teamId: string, players: Player[]) =>
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId ? { ...team, players } : team
      ),
    })),

  selectHomeTeam: (team) => set({ selectedHomeTeam: team }),

  selectAwayTeam: (team) => set({ selectedAwayTeam: team }),

  setMatchResult: (result) => set({ currentMatchResult: result }),

  setIsSimulating: (isSimulating) => set({ isSimulating }),

  resetSelection: () => set({ selectedHomeTeam: null, selectedAwayTeam: null }),
}));

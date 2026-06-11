export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  skill: number;
  speed: number;
  stamina: number;
  shooting: number;
  passing: number;
  defending: number;
  isStarter: boolean;
}

export interface Team {
  id: string;
  name: string;
  country: string;
  flag: string;
  ranking: number;
  strength: number;
  attack: number;
  defense: number;
  midfield: number;
  players: Player[];
}

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
  player: string;
  team: string;
  description: string;
}

export interface MatchStats {
  homePossession: number;
  awayPossession: number;
  homeShots: number;
  awayShots: number;
  homeShotsOnTarget: number;
  awayShotsOnTarget: number;
  homePassAccuracy: number;
  awayPassAccuracy: number;
}

export interface MatchResult {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  winner: string;
  events: MatchEvent[];
  stats: MatchStats;
}

export interface GameState {
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
}
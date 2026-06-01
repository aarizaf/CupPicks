export type MatchStatus = 'live' | 'finished' | 'upcoming';

export interface Prediction {
  matchId: string;
  score1: number | null;
  score2: number | null;
}

export type TournamentPhase = 'Grupos' | 'Octavos' | 'Cuartos' | 'Semis' | 'Final';

export interface Team {
  id: string;
  name: string;
  flag: string;
  confederation: string;
}

export interface TeamStanding {
  team: Pick<Team, 'id' | 'name' | 'flag'>;
  code: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalDiff: string;
  points: number;
  qualified?: boolean;
}

export interface Group {
  id: string;
  name: string;
  matchday: string;
  standings: TeamStanding[];
}

export interface Match {
  id: string;
  group: string;
  team1: { name: string; flag: string };
  team2: { name: string; flag: string };
  score1: number | null;
  score2: number | null;
  status: MatchStatus;
  minute?: string;
  venue: string;
  time?: string;
  isToday?: boolean;
}

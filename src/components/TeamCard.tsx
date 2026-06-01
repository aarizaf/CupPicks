import type { Team } from '../types';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="team-card">
      <div className="big-flag">{team.flag}</div>
      <div className="country">{team.name}</div>
      <div className="conf">{team.confederation}</div>
    </div>
  );
}

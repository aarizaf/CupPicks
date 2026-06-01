import { LiveDot }    from './LiveDot';
import { FlagIcon }   from './FlagIcon';
import type { Match } from '../types';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const { group, team1, team2, score1, score2, status, minute, venue, time, isToday } = match;

  const isLive     = status === 'live';
  const isFinished = status === 'finished';
  const isUpcoming = status === 'upcoming';

  return (
    <div className={`match-card${isLive ? ' live' : ''}`}>
      <div className="match-meta">
        <span>{group}</span>
        {isLive     && <span className="match-status live"><LiveDot /> En Vivo</span>}
        {isFinished && <span className="match-status finished">Finalizado</span>}
        {isUpcoming && <span className="match-status upcoming">Próximo · {time}</span>}
      </div>

      <div className="match-teams">
        <div className="team">
          <div className="team-flag"><FlagIcon flag={team1.flag} width="2.5rem" height="1.75rem" /></div>
          <div className="team-name">{team1.name}</div>
        </div>

        <div className="score-block">
          {isUpcoming ? (
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--muted-foreground)',
              }}
            >
              vs
            </span>
          ) : (
            <>
              <span className="score" style={isFinished ? { opacity: 0.6 } : undefined}>
                {score1}
              </span>
              <span className="score-sep">:</span>
              <span className="score" style={isFinished ? { opacity: 0.6 } : undefined}>
                {score2}
              </span>
            </>
          )}
        </div>

        <div className="team">
          <div className="team-flag"><FlagIcon flag={team2.flag} width="2.5rem" height="1.75rem" /></div>
          <div className="team-name">{team2.name}</div>
        </div>
      </div>

      <div className="match-footer">
        <span className="match-venue">{venue}</span>
        {isLive     && <span className="match-minute">{minute}</span>}
        {isFinished && (
          <span style={{ fontSize: '0.6875rem', color: 'var(--muted-foreground)' }}>FT</span>
        )}
        {isUpcoming && isToday && (
          <span style={{ fontSize: '0.6875rem', color: 'var(--primary)', fontWeight: 600 }}>
            HOY
          </span>
        )}
      </div>
    </div>
  );
}

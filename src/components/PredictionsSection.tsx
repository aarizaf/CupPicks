import { usePredictions } from '../hooks/usePredictions';
import { FlagIcon }        from './FlagIcon';
import { matches }         from '../data/matches';

function parseScore(value: string): number | null {
  if (value === '') return null;
  const n = parseInt(value, 10);
  return isNaN(n) ? null : Math.max(0, n);
}

export function PredictionsSection() {
  const { predictions, setPrediction, clearPredictions } = usePredictions();

  const totalFilled = matches.filter((m) => {
    const p = predictions[m.id];
    return p?.score1 !== null && p?.score1 !== undefined
        && p?.score2 !== null && p?.score2 !== undefined;
  }).length;

  return (
    <section id="pronosticos">
      <div className="section-header">
        <span className="section-title">Mis Pronósticos</span>
        <span className="section-count">
          {totalFilled} / {matches.length} completados
        </span>
      </div>

      <div className="predictions-grid">
        {matches.map((match) => {
          const pred = predictions[match.id];
          const isSaved =
            pred?.score1 !== null && pred?.score1 !== undefined &&
            pred?.score2 !== null && pred?.score2 !== undefined;

          return (
            <div key={match.id} className="prediction-card">
              <div className="prediction-meta">
                <span>{match.group}</span>
                {isSaved ? (
                  <span className="prediction-badge saved">✓ Guardado</span>
                ) : (
                  <span className="prediction-badge pending">Pendiente</span>
                )}
              </div>

              <div className="prediction-teams">
                <div className="team">
                  <div className="team-flag"><FlagIcon flag={match.team1.flag} width="2.5rem" height="1.75rem" /></div>
                  <div className="team-name">{match.team1.name}</div>
                </div>

                <div className="prediction-inputs">
                  <input
                    className="score-input"
                    type="number"
                    min={0}
                    max={99}
                    value={pred?.score1 ?? ''}
                    placeholder="0"
                    aria-label={`Goles ${match.team1.name}`}
                    onChange={(e) =>
                      setPrediction(match.id, parseScore(e.target.value), pred?.score2 ?? null)
                    }
                  />
                  <span className="score-sep">:</span>
                  <input
                    className="score-input"
                    type="number"
                    min={0}
                    max={99}
                    value={pred?.score2 ?? ''}
                    placeholder="0"
                    aria-label={`Goles ${match.team2.name}`}
                    onChange={(e) =>
                      setPrediction(match.id, pred?.score1 ?? null, parseScore(e.target.value))
                    }
                  />
                </div>

                <div className="team">
                  <div className="team-flag"><FlagIcon flag={match.team2.flag} width="2.5rem" height="1.75rem" /></div>
                  <div className="team-name">{match.team2.name}</div>
                </div>
              </div>

              <div className="prediction-footer">
                <span className="match-venue">{match.venue}</span>
                <span className={`match-status ${match.status}`}>
                  {match.status === 'live'
                    ? `En Vivo · ${match.minute}`
                    : match.status === 'finished'
                    ? 'Finalizado'
                    : `Hoy ${match.time}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {totalFilled > 0 && (
        <div className="predictions-actions">
          <button className="btn-clear" onClick={clearPredictions}>
            Limpiar pronósticos
          </button>
        </div>
      )}
    </section>
  );
}

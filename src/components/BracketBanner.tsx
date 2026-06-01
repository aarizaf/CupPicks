import type { TournamentPhase } from '../types';

const phases: TournamentPhase[] = ['Grupos', 'Octavos', 'Cuartos', 'Semis', 'Final'];
const currentPhase: TournamentPhase = 'Grupos';

export function BracketBanner() {
  return (
    <div className="bracket-banner">
      <div>
        <div className="phase">Estado actual</div>
        <div className="title">Fase de Grupos</div>
        <div className="sub">16 grupos · 48 selecciones · 3 partidos por grupo</div>
      </div>
      <div className="bracket-phases">
        {phases.map((phase) => (
          <div
            key={phase}
            className={`phase-pill${phase === currentPhase ? ' current' : ''}`}
          >
            {phase}
          </div>
        ))}
      </div>
    </div>
  );
}

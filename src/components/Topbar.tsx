import { LiveDot } from './LiveDot';
import { useLiveClock } from '../hooks/useLiveClock';

export function Topbar() {
  const time = useLiveClock();

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <span className="topbar-title">Mundial 2026</span>
        <span className="live-badge">
          <LiveDot /> En Vivo
        </span>
      </div>
      <div className="topbar-meta">
        <span>Fase de Grupos · Jornada 2</span>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span>{time}</span>
      </div>
    </header>
  );
}

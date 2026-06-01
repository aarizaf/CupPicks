export function StatsRow() {
  return (
    <div className="stats-row">
      <div className="stat-card highlight">
        <div className="stat-label">Partidos Hoy</div>
        <div className="stat-value">6</div>
        <div className="stat-sub">3 en vivo · 3 terminados</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Goles Hoy</div>
        <div className="stat-value">14</div>
        <div className="stat-sub">2.3 prom. por partido</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Total Partidos</div>
        <div className="stat-value">104</div>
        <div className="stat-sub">48 en fase de grupos</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Selecciones</div>
        <div className="stat-value">48</div>
        <div className="stat-sub">16 grupos de 3</div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem' }}>
        <img src="/images/icon.png" alt="FIFA World Cup 2026" style={{ height: '3.5rem', width: 'auto' }} />
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--sidebar-primary)',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            WORLD CUP
          </div>
          <div className="year" style={{ fontSize: '2rem', marginTop: 0 }}>2026</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Secciones</div>
        <a className="nav-item active" href="#resultados">
          <span className="dot" /> Resultados en vivo
        </a>
        <a className="nav-item" href="#pronosticos">
          <span className="dot" /> Mis Pronósticos
        </a>
        <a className="nav-item" href="#grupos">
          <span className="dot" /> Fase de grupos
        </a>
        <a className="nav-item" href="#selecciones">
          <span className="dot" /> Selecciones
        </a>
        <a className="nav-item" href="#llaves">
          <span className="dot" /> Llaves / Bracket
        </a>

        <div className="nav-label" style={{ marginTop: '1rem' }}>
          Confederaciones
        </div>
        <a className="nav-item" href="#">
          <span className="dot" /> CONMEBOL
        </a>
        <a className="nav-item" href="#">
          <span className="dot" /> UEFA
        </a>
        <a className="nav-item" href="#">
          <span className="dot" /> CONCACAF
        </a>
        <a className="nav-item" href="#">
          <span className="dot" /> CAF · AFC · OFC
        </a>
      </nav>

      <div
        style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid var(--sidebar-accent)',
        }}
      >
        <div
          style={{
            fontSize: '0.6875rem',
            color: 'oklch(0.40 0 0)',
            lineHeight: 1.6,
          }}
        >
          🇺🇸 🇨🇦 🇲🇽
          <br />
          <span style={{ fontWeight: 600, color: 'oklch(0.55 0 0)' }}>
            11 jun – 19 jul 2026
          </span>
        </div>
      </div>
    </aside>
  );
}

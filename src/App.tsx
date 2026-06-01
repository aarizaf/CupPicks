import { useState } from 'react';
import { Sidebar }             from './components/Sidebar';
import { Topbar }              from './components/Topbar';
import { StatsRow }            from './components/StatsRow';
import { MatchCard }           from './components/MatchCard';
import { GroupTable }          from './components/GroupTable';
import { BracketBanner }       from './components/BracketBanner';
import { PredictionsSection }  from './components/PredictionsSection';
import { WorldMap }            from './components/WorldMap';
import { LoginPage }           from './components/LoginPage';
import { matches, upcomingMatches } from './data/matches';
import { groups }  from './data/groups';

const SESSION_KEY = 'cuppicks-session';

function App() {
  const [user, setUser] = useState<string | null>(
    () => sessionStorage.getItem(SESSION_KEY)
  );

  const liveCount = matches.filter((m) => m.status === 'live').length;

  function handleLogin(username: string) {
    sessionStorage.setItem(SESSION_KEY, username);
    setUser(username);
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Topbar />

        <div className="content">
          <StatsRow />

          {/* ── Pronósticos ── */}
          <PredictionsSection />

          {/* ── Resultados en vivo ── */}
          <section id="resultados">
            <div className="section-header">
              <span className="section-title">Resultados en Vivo</span>
              <span className="section-count">{liveCount} partidos activos</span>
            </div>
            <div className="matches-grid">
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>

          {/* ── Fase de Grupos ── */}
          <section id="grupos">
            <div className="section-header">
              <span className="section-title">Fase de Grupos</span>
              <span className="section-count">16 grupos</span>
            </div>
            <div className="groups-grid">
              {groups.map((group) => (
                <GroupTable key={group.id} group={group} />
              ))}
            </div>
          </section>

          {/* ── Selecciones ── */}
          <section id="selecciones">
            <div className="section-header">
              <span className="section-title">Selecciones Clasificadas</span>
              <span className="section-count">48 selecciones · 6 confederaciones</span>
            </div>
            <WorldMap />
          </section>

          {/* ── Bracket / Llaves ── */}
          <section id="llaves">
            <div className="section-header">
              <span className="section-title">Llaves del Torneo</span>
            </div>
            <BracketBanner />
            <div className="section-header">
              <span className="section-title" style={{ fontSize: '1rem' }}>
                Próximos Partidos
              </span>
            </div>
            <div className="matches-grid">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        </div>

        <footer>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <img src="/images/icon.png" alt="FIFA World Cup 2026" style={{ height: '1.25rem', width: 'auto' }} />
            FIFA World Cup 2026 — Dashboard de resultados
          </span>
          <span>Datos ilustrativos · Actualización simulada</span>
        </footer>
      </div>
    </div>
  );
}

export default App;

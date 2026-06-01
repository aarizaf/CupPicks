import { useState, type FormEvent } from 'react';

interface Props {
  onLogin: (username: string) => void;
}

const FEATURES = [
  {
    text: 'Resultados en vivo de cada partido',
    color: 'oklch(0.62 0.18 220)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    text: 'Fase de grupos y tabla de posiciones',
    color: 'oklch(0.72 0.11 82)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    text: 'Mapa interactivo de las 48 selecciones',
    color: 'oklch(0.62 0.16 140)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    text: 'Llaves y bracket del torneo',
    color: 'oklch(0.60 0.16 290)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    text: 'Registra y guarda tus pronósticos',
    color: 'oklch(0.55 0.22 25)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="21.17" y1="8" x2="12" y2="8"/>
        <line x1="3.95" y1="6.06" x2="8.54" y2="14"/>
        <line x1="10.88" y1="21.94" x2="15.46" y2="14"/>
      </svg>
    ),
  },
];

export function LoginPage({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    setError('');
    onLogin(username.trim());
  }

  return (
    <div className="login-page">
      {/* ── Panel izquierdo — branding ── */}
      <div className="login-left">
        <div className="login-brand">
          <div className="login-brand-row">
            <img src="/images/icon.png" alt="CupPicks" className="login-logo" />
            <div>
              <h1 className="login-app-name">CupPicks</h1>
              <p className="login-edition">FIFA World Cup 2026™</p>
            </div>
          </div>
          <p className="login-tagline">
            Tu plataforma de seguimiento para el torneo más grande del mundo.
          </p>
        </div>

        <ul className="login-features">
          {FEATURES.map((f, i) => (
            <li
              key={f.text}
              className="login-feature-item"
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              <span className="login-feature-icon" style={{ '--feat-color': f.color } as React.CSSProperties}>
                {f.icon}
              </span>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>

        <p className="login-hosts">
          <span>🇺🇸</span><span>🇨🇦</span><span>🇲🇽</span>
          <span className="login-hosts-text">USA · CAN · MEX &nbsp;·&nbsp; 11 jun – 19 jul 2026</span>
        </p>
      </div>

      {/* ── Panel derecho — formulario ── */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-title">Bienvenido</h2>
            <p className="login-subtitle">Inicia sesión para acceder al dashboard</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label className="login-label" htmlFor="username">Usuario</label>
              <input
                id="username"
                type="text"
                className="login-input"
                placeholder="Tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="login-field">
              <label className="login-label" htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                className="login-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-btn">
              Entrar al Dashboard
            </button>
          </form>

          <p className="login-hint">
            Demo: cualquier usuario y contraseña (mín. 4 caracteres)
          </p>
        </div>
      </div>
    </div>
  );
}


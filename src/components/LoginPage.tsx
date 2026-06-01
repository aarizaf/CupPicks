import { useState, type FormEvent } from 'react';

interface Props {
  onLogin: (username: string) => void;
}

const FEATURES = [
  { icon: '⚽', text: 'Resultados en vivo de cada partido' },
  { icon: '🗓️', text: 'Seguimiento de la fase de grupos' },
  { icon: '🗺️', text: 'Mapa interactivo de las 48 selecciones' },
  { icon: '🏆', text: 'Llaves y bracket del torneo' },
  { icon: '🎯', text: 'Registra tus pronósticos de marcador' },
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
          <img src="/images/icon.png" alt="CupPicks logo" className="login-logo" />
          <h1 className="login-app-name">CupPicks</h1>
          <p className="login-tagline">
            Tu plataforma personal para el<br />
            <strong>FIFA World Cup 2026™</strong>
          </p>
        </div>

        <ul className="login-features">
          {FEATURES.map((f) => (
            <li key={f.text} className="login-feature-item">
              <span className="login-feature-icon">{f.icon}</span>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>

        <p className="login-edition">
          USA · CANADA · MEXICO &nbsp;·&nbsp; 2026
        </p>
      </div>

      {/* ── Panel derecho — formulario ── */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-title">Bienvenido</h2>
            <p className="login-subtitle">Nos alegra verte de nuevo</p>
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
              Entrar
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

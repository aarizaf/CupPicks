import { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';import { FlagIcon } from './FlagIcon';
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Colores por confederación (valores fijos para SVG fill)
const CONF_COLOR: Record<string, string> = {
  CONMEBOL: 'oklch(0.72 0.11 82)',   // dorado (primary)
  UEFA:     'oklch(0.55 0.22 25)',   // rojo (secondary)
  CONCACAF: 'oklch(0.60 0.18 220)',  // azul
  CAF:      'oklch(0.62 0.16 140)',  // verde
  AFC:      'oklch(0.60 0.16 290)',  // violeta
  OFC:      'oklch(0.58 0.14 190)',  // teal
};

interface TeamInfo {
  flag: string;
  name: string;
  confederation: string;
}

// Clave: código numérico ISO 3166-1 (usado por world-atlas TopoJSON)
const QUALIFIED: Record<string, TeamInfo> = {
  '76':  { flag: '🇧🇷', name: 'Brasil',          confederation: 'CONMEBOL' },
  '32':  { flag: '🇦🇷', name: 'Argentina',       confederation: 'CONMEBOL' },
  '170': { flag: '🇨🇴', name: 'Colombia',        confederation: 'CONMEBOL' },
  '858': { flag: '🇺🇾', name: 'Uruguay',         confederation: 'CONMEBOL' },
  '218': { flag: '🇪🇨', name: 'Ecuador',         confederation: 'CONMEBOL' },
  '604': { flag: '🇵🇪', name: 'Perú',            confederation: 'CONMEBOL' },
  '152': { flag: '🇨🇱', name: 'Chile',           confederation: 'CONMEBOL' },
  '862': { flag: '🇻🇪', name: 'Venezuela',       confederation: 'CONMEBOL' },
  '68':  { flag: '🇧🇴', name: 'Bolivia',         confederation: 'CONMEBOL' },
  '600': { flag: '🇵🇾', name: 'Paraguay',        confederation: 'CONMEBOL' },
  '250': { flag: '🇫🇷', name: 'Francia',         confederation: 'UEFA'     },
  '724': { flag: '🇪🇸', name: 'España',          confederation: 'UEFA'     },
  '276': { flag: '🇩🇪', name: 'Alemania',        confederation: 'UEFA'     },
  '826': { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'Inglaterra',      confederation: 'UEFA'     },
  '620': { flag: '🇵🇹', name: 'Portugal',        confederation: 'UEFA'     },
  '528': { flag: '🇳🇱', name: 'Países Bajos',    confederation: 'UEFA'     },
  '380': { flag: '🇮🇹', name: 'Italia',          confederation: 'UEFA'     },
  '191': { flag: '🇭🇷', name: 'Croacia',         confederation: 'UEFA'     },
  '56':  { flag: '🇧🇪', name: 'Bélgica',         confederation: 'UEFA'     },
  '756': { flag: '🇨🇭', name: 'Suiza',           confederation: 'UEFA'     },
  '208': { flag: '🇩🇰', name: 'Dinamarca',       confederation: 'UEFA'     },
  '616': { flag: '🇵🇱', name: 'Polonia',         confederation: 'UEFA'     },
  '688': { flag: '🇷🇸', name: 'Serbia',          confederation: 'UEFA'     },
  '792': { flag: '🇹🇷', name: 'Turquía',         confederation: 'UEFA'     },
  '840': { flag: '🇺🇸', name: 'Estados Unidos',  confederation: 'CONCACAF' },
  '484': { flag: '🇲🇽', name: 'México',          confederation: 'CONCACAF' },
  '124': { flag: '🇨🇦', name: 'Canadá',          confederation: 'CONCACAF' },
  '188': { flag: '🇨🇷', name: 'Costa Rica',      confederation: 'CONCACAF' },
  '591': { flag: '🇵🇦', name: 'Panamá',          confederation: 'CONCACAF' },
  '388': { flag: '🇯🇲', name: 'Jamaica',         confederation: 'CONCACAF' },
  '340': { flag: '🇭🇳', name: 'Honduras',        confederation: 'CONCACAF' },
  '504': { flag: '🇲🇦', name: 'Marruecos',       confederation: 'CAF'      },
  '686': { flag: '🇸🇳', name: 'Senegal',         confederation: 'CAF'      },
  '566': { flag: '🇳🇬', name: 'Nigeria',         confederation: 'CAF'      },
  '288': { flag: '🇬🇭', name: 'Ghana',           confederation: 'CAF'      },
  '120': { flag: '🇨🇲', name: 'Camerún',         confederation: 'CAF'      },
  '818': { flag: '🇪🇬', name: 'Egipto',          confederation: 'CAF'      },
  '788': { flag: '🇹🇳', name: 'Túnez',           confederation: 'CAF'      },
  '12':  { flag: '🇩🇿', name: 'Argelia',         confederation: 'CAF'      },
  '392': { flag: '🇯🇵', name: 'Japón',           confederation: 'AFC'      },
  '410': { flag: '🇰🇷', name: 'Corea del Sur',   confederation: 'AFC'      },
  '36':  { flag: '🇦🇺', name: 'Australia',       confederation: 'AFC'      },
  '364': { flag: '🇮🇷', name: 'Irán',            confederation: 'AFC'      },
  '682': { flag: '🇸🇦', name: 'Arabia Saudita',  confederation: 'AFC'      },
  '634': { flag: '🇶🇦', name: 'Qatar',           confederation: 'AFC'      },
  '860': { flag: '🇺🇿', name: 'Uzbekistán',      confederation: 'AFC'      },
  '554': { flag: '🇳🇿', name: 'Nueva Zelanda',   confederation: 'OFC'      },
};

interface TooltipState {
  team: TeamInfo;
  x: number;
  y: number;
}

export function WorldMap() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  return (
    <div
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <ComposableMap
        projectionConfig={{ scale: 145, center: [10, 10] }}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const id = String(geo.id);
              const team = QUALIFIED[id];
              const fill = team
                ? (CONF_COLOR[team.confederation] ?? CONF_COLOR.UEFA)
                : 'var(--muted)';

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="var(--background)"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none', opacity: team ? 1 : 0.45 },
                    hover:   { outline: 'none', opacity: 0.8 },
                    pressed: { outline: 'none' },
                  }}
                  onMouseMove={(e: React.MouseEvent) => {
                    if (team) setTooltip({ team, x: e.clientX, y: e.clientY });
                    else setTooltip(null);
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Leyenda confederaciones */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.875rem',
          padding: '0.75rem 1.25rem',
          borderTop: '1px solid var(--border)',
        }}
      >
        {Object.entries(CONF_COLOR).map(([conf, color]) => {
          const count = Object.values(QUALIFIED).filter((t) => t.confederation === conf).length;
          return (
            <div
              key={conf}
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.6875rem' }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>{conf}</span>
              <span style={{ color: 'var(--muted-foreground)' }}>{count}</span>
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x + 14,
            top: tooltip.y - 56,
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '0.5rem 0.875rem',
            pointerEvents: 'none',
            zIndex: 100,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px oklch(0 0 0 / 0.18)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.02em',
            }}
          >
            <span style={{ fontSize: '1.25rem' }}><FlagIcon flag={tooltip.team.flag} width="1.5rem" height="1rem" /></span>
            <span>{tooltip.team.name}</span>
          </div>
          <div
            style={{
              fontSize: '0.6rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: CONF_COLOR[tooltip.team.confederation],
              marginTop: '0.125rem',
            }}
          >
            {tooltip.team.confederation}
          </div>
        </div>
      )}
    </div>
  );
}

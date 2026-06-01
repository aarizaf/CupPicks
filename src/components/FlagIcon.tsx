import * as Flags from 'country-flag-icons/react/3x2';
import type { SVGProps, ReactElement } from 'react';

type FlagComponent = (props: SVGProps<SVGSVGElement>) => ReactElement;
type FlagsMap = Record<string, FlagComponent>;

/**
 * Convierte un emoji de bandera (ej. 🇧🇷) a código ISO alpha-2 (ej. "BR").
 * Los emojis de bandera son pares de Regional Indicator Symbols (U+1F1E6–U+1F1FF).
 * Offset base: U+1F1E6 − 'A' (0x41) = 127397
 */
function emojiToISO(flag: string): string {
  const chars = [...flag];
  if (chars.length !== 2) return '';
  const cp0 = chars[0].codePointAt(0) ?? 0;
  const cp1 = chars[1].codePointAt(0) ?? 0;
  if (cp0 < 127462 || cp0 > 127487) return '';
  return String.fromCodePoint(cp0 - 127397) + String.fromCodePoint(cp1 - 127397);
}

interface FlagIconProps extends SVGProps<SVGSVGElement> {
  /** Emoji de bandera, ej. 🇧🇷 */
  flag: string;
  /** Ancho del SVG (default: "1.5rem") */
  width?: string | number;
  /** Alto del SVG (default: "1rem") */
  height?: string | number;
}

export function FlagIcon({ flag, width = '1.5rem', height = '1rem', style, ...rest }: FlagIconProps) {
  const iso = emojiToISO(flag);

  // Caso especial: bandera de Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿 → usar GB como fallback
  const code = iso || (flag.includes('\u{1F3F4}') ? 'GB' : '');

  const Flag = code ? (Flags as unknown as FlagsMap)[code] : null;

  if (!Flag) {
    return (
      <span
        style={{ fontSize: '1.25rem', lineHeight: 1, display: 'inline-block', ...style as React.CSSProperties }}
      >
        {flag}
      </span>
    );
  }

  return (
    <Flag
      width={width}
      height={height}
      style={{
        borderRadius: '2px',
        display: 'block',
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    />
  );
}

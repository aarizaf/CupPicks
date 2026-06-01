import type { Group } from '../types';

export const groups: Group[] = [
  {
    id: 'A',
    name: 'Grupo A',
    matchday: 'Jornada 2 / 3',
    standings: [
      {
        team: { id: 'bra', name: 'Brasil', flag: '🇧🇷' },
        code: 'BRA', played: 2, won: 2, drawn: 0, lost: 0,
        goalDiff: '+4', points: 6, qualified: true,
      },
      {
        team: { id: 'mex', name: 'México', flag: '🇲🇽' },
        code: 'MEX', played: 2, won: 1, drawn: 0, lost: 1,
        goalDiff: '+1', points: 3, qualified: true,
      },
      {
        team: { id: 'crc', name: 'Costa Rica', flag: '🇨🇷' },
        code: 'CRC', played: 2, won: 0, drawn: 0, lost: 2,
        goalDiff: '-5', points: 0,
      },
    ],
  },
  {
    id: 'B',
    name: 'Grupo B',
    matchday: 'Jornada 2 / 3',
    standings: [
      {
        team: { id: 'arg', name: 'Argentina', flag: '🇦🇷' },
        code: 'ARG', played: 2, won: 2, drawn: 0, lost: 0,
        goalDiff: '+5', points: 6, qualified: true,
      },
      {
        team: { id: 'can', name: 'Canadá', flag: '🇨🇦' },
        code: 'CAN', played: 2, won: 1, drawn: 0, lost: 1,
        goalDiff: '0', points: 3, qualified: true,
      },
      {
        team: { id: 'ksa', name: 'Arabia Saudita', flag: '🇸🇦' },
        code: 'KSA', played: 2, won: 0, drawn: 0, lost: 2,
        goalDiff: '-5', points: 0,
      },
    ],
  },
  {
    id: 'C',
    name: 'Grupo C',
    matchday: 'Jornada 2 / 3',
    standings: [
      {
        team: { id: 'fra', name: 'Francia', flag: '🇫🇷' },
        code: 'FRA', played: 2, won: 1, drawn: 1, lost: 0,
        goalDiff: '+2', points: 4, qualified: true,
      },
      {
        team: { id: 'ger', name: 'Alemania', flag: '🇩🇪' },
        code: 'GER', played: 2, won: 1, drawn: 1, lost: 0,
        goalDiff: '+1', points: 4, qualified: true,
      },
      {
        team: { id: 'mar', name: 'Marruecos', flag: '🇲🇦' },
        code: 'MAR', played: 2, won: 0, drawn: 0, lost: 2,
        goalDiff: '-3', points: 0,
      },
    ],
  },
  {
    id: 'D',
    name: 'Grupo D',
    matchday: 'Jornada 2 / 3',
    standings: [
      {
        team: { id: 'esp', name: 'España', flag: '🇪🇸' },
        code: 'ESP', played: 2, won: 2, drawn: 0, lost: 0,
        goalDiff: '+4', points: 6, qualified: true,
      },
      {
        team: { id: 'jpn', name: 'Japón', flag: '🇯🇵' },
        code: 'JPN', played: 2, won: 0, drawn: 1, lost: 1,
        goalDiff: '-2', points: 1, qualified: true,
      },
      {
        team: { id: 'uru', name: 'Uruguay', flag: '🇺🇾' },
        code: 'URU', played: 2, won: 0, drawn: 1, lost: 1,
        goalDiff: '-2', points: 1,
      },
    ],
  },
];

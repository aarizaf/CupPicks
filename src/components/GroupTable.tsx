import type { Group } from '../types';
import { FlagIcon }   from './FlagIcon';

interface GroupTableProps {
  group: Group;
}

export function GroupTable({ group }: GroupTableProps) {
  return (
    <div className="group-card">
      <div className="group-header">
        <span className="group-name">{group.name}</span>
        <span className="group-label">{group.matchday}</span>
      </div>
      <table className="group-table">
        <thead>
          <tr>
            <th>Selección</th>
            <th>J</th>
            <th>G</th>
            <th>E</th>
            <th>P</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {group.standings.map((s) => (
            <tr key={s.team.id} className={s.qualified ? 'qualified' : ''}>
              <td>
                <div className="team-row">
                  <span className="flag"><FlagIcon flag={s.team.flag} width="1.5rem" height="1rem" /></span>
                  <span className="team-code">{s.code}</span>
                </div>
              </td>
              <td>{s.played}</td>
              <td>{s.won}</td>
              <td>{s.drawn}</td>
              <td>{s.lost}</td>
              <td>{s.goalDiff}</td>
              <td className="pts-cell">{s.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

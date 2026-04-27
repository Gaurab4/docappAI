import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/shared/components/Card'
import { StatusPill } from '@/shared/components/StatusPill'
import { ViewToggle } from '@/shared/components/ViewToggle'
import type { PatientViewMode } from '@/store/patientsSlice'
import { useAppSelector } from '@/store/hooks'

export function PatientsDirectoryPage() {
  const patients = useAppSelector((s) => s.patients.patients)
  const [mode, setMode] = useState<PatientViewMode>('grid')

  const sorted = useMemo(
    () => [...patients].sort((a, b) => a.fullName.localeCompare(b.fullName)),
    [patients]
  )

  return (
    <div className="stack stack--page">
      <div className="page-intro page-intro--row">
        <div>
          <h2>Patient directory</h2>
          <p className="muted">Browse the active cohort. Switch layout without losing your place.</p>
        </div>
        <ViewToggle value={mode} onChange={setMode} />
      </div>

      {mode === 'grid' ? (
        <div className="patient-grid">
          {sorted.map((p) => (
            <Link key={p.id} to={`/patients/${p.id}`} className="patient-card">
              <div className="patient-card__top">
                <div>
                  <div className="patient-card__name">{p.fullName}</div>
                  <div className="patient-card__meta mono">{p.mrn}</div>
                </div>
                <StatusPill status={p.status} />
              </div>
              <dl className="patient-card__dl">
                <div>
                  <dt>Department</dt>
                  <dd>{p.department}</dd>
                </div>
                <div>
                  <dt>Last visit</dt>
                  <dd>{p.lastVisit}</dd>
                </div>
              </dl>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <div className="table-scroll">
            <table className="data-table data-table--dense">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>MRN</th>
                  <th>DOB</th>
                  <th>Department</th>
                  <th>Attending</th>
                  <th>Status</th>
                  <th className="right">Chart</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((p) => (
                  <tr key={p.id}>
                    <td>{p.fullName}</td>
                    <td className="mono">{p.mrn}</td>
                    <td>{p.dob}</td>
                    <td>{p.department}</td>
                    <td>{p.attending}</td>
                    <td>
                      <StatusPill status={p.status} />
                    </td>
                    <td className="right">
                      <Link className="text-link" to={`/patients/${p.id}`}>
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

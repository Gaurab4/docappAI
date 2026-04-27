import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card } from '@/shared/components/Card'
import { StatusPill } from '@/shared/components/StatusPill'
import { ViewToggle } from '@/shared/components/ViewToggle'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setDetailViewMode } from '@/store/patientsSlice'

function RiskMeter({ value }: { value: number }) {
  const tone = value >= 60 ? 'high' : value >= 40 ? 'mid' : 'low'
  return (
    <div className={`risk risk--${tone}`}>
      <div className="risk__label">Population risk index</div>
      <div className="risk__value">{value}</div>
      <div className="risk__bar" aria-hidden>
        <span style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  )
}

export function PatientDetailsPage() {
  const dispatch = useAppDispatch()
  const { patientId } = useParams()
  const patient = useAppSelector((s) =>
    patientId ? s.patients.patients.find((p) => p.id === patientId) : undefined
  )
  const detailViewMode = useAppSelector((s) => s.patients.detailViewMode)

  if (!patient) {
    return (
      <div className="empty-state">
        <h2>Patient not found</h2>
        <p className="muted">The identifier in the URL does not match a record in this demo.</p>
        <Link className="text-link" to="/patients">
          Back to directory
        </Link>
      </div>
    )
  }

  const blocks: { title: string; rows: { k: string; v: ReactNode }[] }[] = [
    {
      title: 'Demographics',
      rows: [
        { k: 'Legal name', v: patient.fullName },
        { k: 'MRN', v: patient.mrn },
        { k: 'Date of birth', v: patient.dob },
        { k: 'Sex', v: patient.sex },
      ],
    },
    {
      title: 'Clinical',
      rows: [
        { k: 'Primary diagnosis', v: patient.diagnosis },
        { k: 'Acuity', v: <StatusPill status={patient.status} /> },
        { k: 'Last visit', v: patient.lastVisit },
      ],
    },
    {
      title: 'Care team',
      rows: [
        { k: 'Department', v: patient.department },
        { k: 'Attending', v: patient.attending },
      ],
    },
  ]

  return (
    <div className="stack stack--page">
      <div className="page-intro page-intro--row">
        <div>
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/patients">Patients</Link>
            <span aria-hidden>/</span>
            <span>{patient.fullName}</span>
          </nav>
          <h2>{patient.fullName}</h2>
          <p className="muted mono">{patient.mrn}</p>
        </div>
        <ViewToggle
          value={detailViewMode}
          onChange={(mode) => dispatch(setDetailViewMode(mode))}
        />
      </div>

      <RiskMeter value={patient.riskScore} />

      {detailViewMode === 'grid' ? (
        <div className="detail-grid">
          {blocks.map((b) => (
            <Card key={b.title} title={b.title}>
              <dl className="kv-grid">
                {b.rows.map((row) => (
                  <div key={row.k} className="kv-grid__row">
                    <dt>{row.k}</dt>
                    <dd>{row.v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="table-scroll">
            <table className="data-table data-table--dense">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {blocks.flatMap((b) =>
                  b.rows.map((row) => (
                    <tr key={`${b.title}-${row.k}`}>
                      <td>{b.title}</td>
                      <td>{row.k}</td>
                      <td>{row.v}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

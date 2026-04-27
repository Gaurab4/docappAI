import { Link } from 'react-router-dom'
import { Card } from '@/shared/components/Card'
import { Button } from '@/shared/components/Button'
import { StatusPill } from '@/shared/components/StatusPill'
import { useAppSelector } from '@/store/hooks'
import { requestNotificationPermission, showLocalDesktopNotification } from '@/lib/serviceWorker'

export function DashboardPage() {
  const patients = useAppSelector((s) => s.patients.patients)

  async function sendLabReadyPing() {
    const permission = await requestNotificationPermission()
    if (permission !== 'granted') {
      window.alert('Allow notifications in your browser to preview clinical alerts.')
      return
    }
    const shown = showLocalDesktopNotification({
      title: 'New lab result',
      body: 'CBC differential for Jordan Lee is ready for review.',
      openPath: '/patients/p-10021',
    })
    if (!shown) {
      window.alert('Could not show a notification. Check that notifications are allowed for this site.')
    }
  }

  const critical = patients.filter((p) => p.status === 'critical').length
  const active = patients.filter((p) => p.status === 'active').length

  return (
    <div className="stack stack--page">
      <div className="page-intro">
        <h2>Operational overview</h2>
        <p className="muted">Live snapshot of cohort risk and throughput (demo data).</p>
      </div>

      <div className="stat-grid">
        <Card title="Active patients" subtitle="Across connected sites">
          <div className="stat-kpi">{active}</div>
        </Card>
        <Card title="High acuity" subtitle="Needs attention today">
          <div className="stat-kpi stat-kpi--alert">{critical}</div>
        </Card>
        <Card title="Clinical alerts" subtitle="Preview desktop notifications">
          <p className="muted tight">
            Each click sends a new local alert. Click the alert to open the linked chart.
          </p>
          <Button type="button" variant="secondary" onClick={sendLabReadyPing}>
            Simulate lab-ready alert
          </Button>
        </Card>
      </div>

      <Card
        title="Recent roster"
        subtitle="Open a chart from the current session"
        action={
          <Link className="text-link" to="/patients">
            View all
          </Link>
        }
      >
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>MRN</th>
                <th>Department</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {patients.slice(0, 4).map((p) => (
                <tr key={p.id}>
                  <td>{p.fullName}</td>
                  <td className="mono">{p.mrn}</td>
                  <td>{p.department}</td>
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
    </div>
  )
}

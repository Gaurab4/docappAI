import type { PatientStatus } from '@/store/patientsSlice'

const labels: Record<PatientStatus, string> = {
  active: 'Stable',
  critical: 'High acuity',
  discharged: 'Discharged',
}

export function StatusPill({ status }: { status: PatientStatus }) {
  return <span className={`pill pill--${status}`}>{labels[status]}</span>
}

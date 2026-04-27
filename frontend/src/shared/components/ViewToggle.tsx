import type { PatientViewMode } from '@/store/patientsSlice'

type Props = {
  value: PatientViewMode
  onChange: (mode: PatientViewMode) => void
}

export function ViewToggle({ value, onChange }: Props) {
  return (
    <div className="view-toggle" role="group" aria-label="Patient layout">
      <button
        type="button"
        className={`view-toggle__btn${value === 'grid' ? ' view-toggle__btn--on' : ''}`}
        onClick={() => onChange('grid')}
        aria-pressed={value === 'grid'}
      >
        Grid
      </button>
      <button
        type="button"
        className={`view-toggle__btn${value === 'list' ? ' view-toggle__btn--on' : ''}`}
        onClick={() => onChange('list')}
        aria-pressed={value === 'list'}
      >
        List
      </button>
    </div>
  )
}

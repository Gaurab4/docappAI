type Props = { label?: string }

export function Spinner({ label = 'Loading' }: Props) {
  return (
    <span className="spinner" role="status" aria-live="polite">
      <span className="spinner__ring" aria-hidden />
      <span className="visually-hidden">{label}</span>
    </span>
  )
}

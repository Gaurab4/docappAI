import type { InputHTMLAttributes } from 'react'

type Props = {
  label: string
  hint?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export function TextField({ label, hint, error, id, className = '', ...rest }: Props) {
  const fieldId = id ?? rest.name
  return (
    <div className={`field ${className}`.trim()}>
      <label className="field__label" htmlFor={fieldId}>
        {label}
      </label>
      <input id={fieldId} className={`field__input ${error ? 'field__input--error' : ''}`} {...rest} />
      {hint && !error && <p className="field__hint">{hint}</p>}
      {error && <p className="field__error">{error}</p>}
    </div>
  )
}

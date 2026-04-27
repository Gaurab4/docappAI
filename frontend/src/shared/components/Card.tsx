import type { HTMLAttributes, ReactNode } from 'react'

type Props = {
  title?: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>

export function Card({ title, subtitle, action, children, className = '', ...rest }: Props) {
  return (
    <div className={`card ${className}`.trim()} {...rest}>
      {(title || subtitle || action) && (
        <div className="card__head">
          <div>
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="card__body">{children}</div>
    </div>
  )
}

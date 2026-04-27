import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

type Props = {
  children: ReactNode
  variant?: Variant
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  variant = 'primary',
  fullWidth,
  className = '',
  type = 'button',
  ...rest
}: Props) {
  const cls = ['btn', `btn--${variant}`, fullWidth ? 'btn--block' : '', className]
    .filter(Boolean)
    .join(' ')
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  )
}

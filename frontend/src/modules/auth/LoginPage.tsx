import { useEffect, useState, type FormEvent } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/shared/components/Button'
import { TextField } from '@/shared/components/TextField'
import { Spinner } from '@/shared/components/Spinner'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearError, login } from '@/store/authSlice'
import { firebaseConfigured } from '@/lib/firebase'

function validate(email: string, password: string): Record<string, string> {
  const errors: Record<string, string> = {}
  if (!email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!password) {
    errors.password = 'Password is required.'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }
  return errors
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)
  const busy = useAppSelector((s) => s.auth.busy)
  const error = useAppSelector((s) => s.auth.error)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (user && firebaseConfigured) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from, dispatch])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    dispatch(clearError())
    const v = validate(email, password)
    setFieldErrors(v)
    if (Object.keys(v).length) {
      return
    }
    await dispatch(login({ email, password }))
  }

  return (
    <div className="auth-layout">
      <div className="auth-layout__photo" aria-hidden />
      <div className="auth-layout__scrim" aria-hidden />
      <div className="auth-layout__mesh" aria-hidden />

      <header className="auth-nav">
        <div className="auth-nav__brand">
          <span className="auth-nav__logo" aria-hidden />
          <span className="auth-nav__name">DocApp Clinical</span>
        </div>
        <p className="auth-nav__center">Sign in to continue</p>
        <span className="auth-nav__chip">Secure session</span>
      </header>

      <div className="auth-main">
        <section className="auth-hero" aria-labelledby="auth-hero-heading">
          <div className="auth-hero__visual" aria-hidden>
            <span className="auth-hero__ring auth-hero__ring--1" />
            <span className="auth-hero__ring auth-hero__ring--2" />
            <span className="auth-hero__ring auth-hero__ring--3" />
            <span className="auth-hero__icon" />
          </div>
          <h1 id="auth-hero-heading" className="auth-hero__title">
            Your journey to better care begins here
          </h1>
          <p className="auth-hero__lede">
            Schedule your access today and work from a calm, clinical-grade workspace—where your
            team stays coordinated and patient context stays protected.
          </p>
        </section>

        <div className="auth-panel">
          <div className="auth-panel__inner">
            <div className="auth-brand">
              <span className="auth-brand__mark" aria-hidden />
              <div>
                <div className="auth-brand__title">Welcome back</div>
                <p className="auth-brand__subtitle">Use demo email to sign in</p>
              </div>
            </div>

            {!firebaseConfigured && (
              <div className="banner banner--warn" role="status">
                Sign-in is not configured for this deployment. Your email admin can enable it.
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <TextField
                label="Email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
                disabled={busy}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={fieldErrors.password}
                disabled={busy}
              />

              {error && (
                <div className="banner banner--error" role="alert">
                  {error}
                </div>
              )}

              <Button type="submit" fullWidth disabled={busy} className="btn--pill btn--auth-cta">
                {busy ? (
                  <span className="btn__row">
                    <Spinner label="Signing in" />
                    Signing in…
                  </span>
                ) : (
                  'Sign in to workspace'
                )}
              </Button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

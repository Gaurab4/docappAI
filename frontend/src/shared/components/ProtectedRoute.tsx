import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAppSelector } from '@/store/hooks'
import { firebaseConfigured } from '@/lib/firebase'
import { Spinner } from '@/shared/components/Spinner'

type Props = { children: ReactNode }

export function ProtectedRoute({ children }: Props) {
  const location = useLocation()
  const initialized = useAppSelector((s) => s.auth.initialized)
  const user = useAppSelector((s) => s.auth.user)

  if (!initialized) {
    return (
      <div className="route-loader">
        <Spinner label="Checking session" />
      </div>
    )
  }

  if (!firebaseConfigured) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

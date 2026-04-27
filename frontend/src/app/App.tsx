import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/shared/components/AppShell'
import { ProtectedRoute } from '@/shared/components/ProtectedRoute'
import { Spinner } from '@/shared/components/Spinner'

const LoginPage = lazy(() =>
  import('@/modules/auth').then((m) => ({ default: m.LoginPage }))
)
const DashboardPage = lazy(() =>
  import('@/modules/dashboard').then((m) => ({ default: m.DashboardPage }))
)
const AnalyticsPage = lazy(() =>
  import('@/modules/analytics').then((m) => ({ default: m.AnalyticsPage }))
)
const PatientsDirectoryPage = lazy(() =>
  import('@/modules/patients').then((m) => ({ default: m.PatientsDirectoryPage }))
)
const PatientDetailsPage = lazy(() =>
  import('@/modules/patients').then((m) => ({ default: m.PatientDetailsPage }))
)

function RouteFallback() {
  return (
    <div className="route-loader">
      <Spinner label="Loading module" />
    </div>
  )
}

export default function App() {
  return (
    <div className="app-viewport">
      <BrowserRouter>
        <div className="app-routes-wrap">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                element={
                  <ProtectedRoute>
                    <AppShell />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<DashboardPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/patients" element={<PatientsDirectoryPage />} />
                <Route path="/patients/:patientId" element={<PatientDetailsPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </div>
  )
}

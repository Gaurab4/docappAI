import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logoutUser } from '@/store/authSlice'

const nav = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/analytics', label: 'Analytics' },
  { to: '/patients', label: 'Patients' },
]

function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconPanelLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M15 12l-4-4m0 8l4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  async function handleSignOut() {
    await dispatch(logoutUser())
    navigate('/login', { replace: true })
  }

  return (
    <div className={`shell${sidebarOpen ? '' : ' shell--collapsed'}`}>
      <aside
        id="app-sidebar"
        className="shell__sidebar"
        aria-label="Primary"
        {...(!sidebarOpen ? { 'aria-hidden': true, inert: true } : {})}
      >
        <div className="shell__sidebar-head">
          <div className="shell__brand">
            <span className="shell__logo" aria-hidden />
            <div>
              <div className="shell__product">DocApp Clinical</div>
              <div className="shell__tag">B2B Care Platform</div>
            </div>
          </div>
          <button
            type="button"
            className="shell__sidebar-collapse"
            onClick={() => setSidebarOpen(false)}
            aria-label="Collapse sidebar"
          >
            <IconPanelLeft />
          </button>
        </div>
        <nav className="shell__nav">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `shell__link${isActive ? ' shell__link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="shell__user">
          <div className="shell__user-meta">
            <div className="shell__user-name">{user?.email ?? 'Clinician'}</div>
            <div className="shell__user-role">Licensed user</div>
          </div>
          <button type="button" className="shell__signout" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </aside>

      <div className="shell__main">
        <header className="shell__topbar">
          <div className="shell__topbar-row">
            <button
              type="button"
              className="shell__sidebar-toggle"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-expanded={sidebarOpen}
              aria-controls="app-sidebar"
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? <IconPanelLeft /> : <IconMenu />}
            </button>
            <h1 className="shell__page-title">Workspace</h1>
          </div>
        </header>
        <main className="shell__content">
          <div key={location.pathname} className="animated-route">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

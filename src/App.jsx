import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppProvider } from './context/AppContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'
import Clients from './pages/Clients'
import Pipeline from './pages/Pipeline'
import Settings from './pages/Settings'
import { getActiveRoutes, getPublicRoutes, isModuleEnabled } from './moduleRegistry'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  return user ? <Navigate to="/dashboard" replace /> : children
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function AppRoutes() {
  const privateRoutes = getActiveRoutes()
  const publicRoutes  = getPublicRoutes()

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public module routes (auth pages, etc.) */}
        {publicRoutes.map(({ path, component: Page }) => (
          <Route
            key={path}
            path={path}
            element={<PublicRoute><Page /></PublicRoute>}
          />
        ))}

        {/* Fallback public routes when auth module is disabled */}
        {!isModuleEnabled('auth') && (
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        )}

        {/* Private layout — all authenticated pages */}
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* ── Core routes (always active) ── */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads"     element={<Leads />} />
          <Route path="clients"   element={<Clients />} />
          <Route path="pipeline"  element={<Pipeline />} />
          <Route path="settings"  element={<Settings />} />

          {/* ── Module routes (conditionally loaded) ── */}
          {privateRoutes.map(({ path, component: Page }) => (
            <Route
              key={path}
              path={path.replace(/^\//, '')}
              element={<Page />}
            />
          ))}
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

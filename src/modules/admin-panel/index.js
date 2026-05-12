import { lazy } from 'react'
import { LayoutGrid, Users } from 'lucide-react'
import config from './config'

const ModulesManager = lazy(() => import('./pages/ModulesManager'))
const Team           = lazy(() => import('../../pages/Team'))

export default {
  ...config,
  routes: [
    { path: '/modules', component: ModulesManager },
    { path: '/team',    component: Team },
  ],
  navItems: [
    { to: '/team',    icon: Users,       label: 'Team',    order: 20, section: 'admin' },
    { to: '/modules', icon: LayoutGrid,  label: 'Modules', order: 21, section: 'admin' },
  ],
}

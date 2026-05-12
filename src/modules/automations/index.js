import { lazy } from 'react'
import config from './config'

const AutomationsPage = lazy(() => import('./pages/AutomationsPage'))

export default {
  ...config,
  routes: [
    { path: '/automations', component: AutomationsPage },
  ],
  navItems: [
    { to: '/automations', icon: config.icon, label: 'Automations', order: 11 },
  ],
}

import { lazy } from 'react'
import config from './config'

const AfipPage = lazy(() => import('./pages/AfipPage'))

export default {
  ...config,
  routes: [
    { path: '/afip', component: AfipPage },
  ],
  navItems: [
    { to: '/afip', icon: config.icon, label: 'AFIP', order: 13 },
  ],
}

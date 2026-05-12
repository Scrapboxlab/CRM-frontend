import { lazy } from 'react'
import config from './config'

const AnalyticsPage = lazy(() => import('../../pages/Analytics'))

export default {
  ...config,
  routes: [
    { path: '/analytics', component: AnalyticsPage },
  ],
  navItems: [
    { to: '/analytics', icon: config.icon, label: 'Analytics', order: 8 },
  ],
}

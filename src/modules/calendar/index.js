import { lazy } from 'react'
import config from './config'

const CalendarPage = lazy(() => import('../../pages/Calendar'))

export default {
  ...config,
  routes: [
    { path: '/calendar', component: CalendarPage },
  ],
  navItems: [
    { to: '/calendar', icon: config.icon, label: 'Calendar', order: 6 },
  ],
}

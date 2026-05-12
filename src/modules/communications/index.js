import { lazy } from 'react'
import config from './config'

const CommunicationsPage = lazy(() => import('../../pages/Communications'))

export default {
  ...config,
  routes: [
    { path: '/communications', component: CommunicationsPage },
  ],
  navItems: [
    { to: '/communications', icon: config.icon, label: 'Communications', order: 7, badge: 'unreadMessages' },
  ],
}

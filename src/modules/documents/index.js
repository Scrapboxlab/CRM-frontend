import { lazy } from 'react'
import config from './config'

const DocumentsPage = lazy(() => import('../../pages/Documents'))

export default {
  ...config,
  routes: [
    { path: '/documents', component: DocumentsPage },
  ],
  navItems: [
    { to: '/documents', icon: config.icon, label: 'Documents', order: 9 },
  ],
}

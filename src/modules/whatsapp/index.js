import { lazy } from 'react'
import config from './config'

const WhatsAppPage = lazy(() => import('./pages/WhatsAppPage'))

export default {
  ...config,
  routes: [
    { path: '/whatsapp', component: WhatsAppPage },
  ],
  navItems: [
    { to: '/whatsapp', icon: config.icon, label: 'WhatsApp', order: 10 },
  ],
}

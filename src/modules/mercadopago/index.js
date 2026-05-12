import { lazy } from 'react'
import config from './config'

const MercadoPagoPage = lazy(() => import('./pages/MercadoPagoPage'))

export default {
  ...config,
  routes: [
    { path: '/mercadopago', component: MercadoPagoPage },
  ],
  navItems: [
    { to: '/mercadopago', icon: config.icon, label: 'MercadoPago', order: 12 },
  ],
}

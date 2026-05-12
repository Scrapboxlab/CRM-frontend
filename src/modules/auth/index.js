import { lazy } from 'react'
import config from './config'

const Login    = lazy(() => import('../../pages/auth/Login'))
const Register = lazy(() => import('../../pages/auth/Register'))

export default {
  ...config,
  routes: [
    { path: '/login',    component: Login,    public: true },
    { path: '/register', component: Register, public: true },
  ],
  navItems: [],
}

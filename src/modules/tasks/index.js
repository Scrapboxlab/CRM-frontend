import { lazy } from 'react'
import config from './config'

const TasksPage = lazy(() => import('../../pages/Tasks'))

export default {
  ...config,
  routes: [
    { path: '/tasks', component: TasksPage },
  ],
  navItems: [
    { to: '/tasks', icon: config.icon, label: 'Tasks', order: 5 },
  ],
}

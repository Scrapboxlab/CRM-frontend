import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, UserCheck, TrendingUp, CheckSquare,
  Calendar, MessageSquare, BarChart3, FileText, Settings,
  ChevronLeft, ChevronRight, Zap, Bell, FolderOpen
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { clsx } from 'clsx'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/leads', icon: Users, label: 'Leads' },
  { to: '/clients', icon: UserCheck, label: 'Clients' },
  { to: '/pipeline', icon: TrendingUp, label: 'Pipeline' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/communications', icon: MessageSquare, label: 'Communications' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/documents', icon: FolderOpen, label: 'Documents' },
  { to: '/team', icon: Users, label: 'Team' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, unreadMessages, unreadNotifications } = useApp()

  const badges = {
    '/communications': unreadMessages,
  }

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 240 : 64 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="relative flex flex-col h-screen bg-primary-800 dark:bg-primary-900 border-r border-primary-700 shrink-0 z-20"
    >
      <div className="flex items-center h-16 px-4 border-b border-primary-700">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <span className="font-bold text-white text-sm whitespace-nowrap">Scrapbox CRM</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-1 px-2">
          {navItems.map(({ to, icon: Icon, label }) => {
            const badge = badges[to]
            return (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    clsx(
                      'group flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all duration-150',
                      isActive
                        ? 'bg-accent text-white'
                        : 'text-primary-300 hover:text-white hover:bg-primary-700'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="relative shrink-0">
                        <Icon size={18} />
                        {badge > 0 && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                            {badge}
                          </span>
                        )}
                      </div>
                      <AnimatePresence>
                        {sidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="whitespace-nowrap overflow-hidden"
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <button
        onClick={() => setSidebarOpen(o => !o)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary-700 border border-primary-600 text-primary-300 hover:text-white flex items-center justify-center transition-colors z-10"
      >
        {sidebarOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </button>
    </motion.aside>
  )
}

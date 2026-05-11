import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, Sun, Moon, ChevronDown, LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'

const breadcrumbMap = {
  '/dashboard': 'Dashboard',
  '/leads': 'Leads',
  '/clients': 'Clients',
  '/pipeline': 'Pipeline',
  '/tasks': 'Tasks',
  '/calendar': 'Calendar',
  '/communications': 'Communications',
  '/analytics': 'Analytics',
  '/documents': 'Documents',
  '/team': 'Team',
  '/settings': 'Settings',
}

export default function Topbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme, notifications, markNotificationRead, markAllNotificationsRead, unreadNotifications } = useApp()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const profileRef = useRef(null)
  const notifRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const page = breadcrumbMap[location.pathname] || 'CRM'

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const notifIcons = {
    lead: '👤',
    deal: '💼',
    task: '✅',
    mention: '💬',
    reminder: '🔔',
  }

  return (
    <header className="h-16 border-b border-slate-200 dark:border-primary-700 bg-white dark:bg-primary-800 flex items-center px-6 gap-4 shrink-0">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-primary-300">
        <span className="text-slate-400 dark:text-primary-400">Scrapbox</span>
        <span>/</span>
        <span className="font-medium text-slate-700 dark:text-white">{page}</span>
      </div>

      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search leads, clients, deals..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-primary-700 border border-slate-200 dark:border-primary-600 rounded-lg text-slate-700 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 dark:text-primary-300 hover:bg-slate-100 dark:hover:bg-primary-700 transition-colors"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(o => !o)}
            className="relative p-2 rounded-lg text-slate-500 dark:text-primary-300 hover:bg-slate-100 dark:hover:bg-primary-700 transition-colors"
          >
            <Bell size={18} />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl shadow-xl z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-primary-700">
                  <span className="font-semibold text-sm text-slate-800 dark:text-white">Notifications</span>
                  <button onClick={markAllNotificationsRead} className="text-xs text-accent hover:underline">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-primary-700">
                  {notifications.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-6">No notifications</p>
                  )}
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`flex gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-primary-700 transition-colors ${!n.read ? 'bg-accent/5' : ''}`}
                    >
                      <span className="text-lg shrink-0">{notifIcons[n.type]}</span>
                      <div className="min-w-0">
                        <p className={`text-sm font-medium ${!n.read ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-primary-300'}`}>{n.title}</p>
                        <p className="text-xs text-slate-400 truncate">{n.body}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(o => !o)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-primary-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.initials || 'U'}
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-white hidden sm:block">{user?.name?.split(' ')[0]}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-52 bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl shadow-xl z-50 py-1"
              >
                <div className="px-4 py-3 border-b border-slate-100 dark:border-primary-700">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
                <button onClick={() => { navigate('/settings'); setProfileOpen(false) }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-primary-300 hover:bg-slate-50 dark:hover:bg-primary-700 transition-colors">
                  <User size={14} />
                  Profile
                </button>
                <button onClick={() => { navigate('/settings'); setProfileOpen(false) }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-primary-300 hover:bg-slate-50 dark:hover:bg-primary-700 transition-colors">
                  <Settings size={14} />
                  Settings
                </button>
                <div className="border-t border-slate-100 dark:border-primary-700 mt-1 pt-1">
                  <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

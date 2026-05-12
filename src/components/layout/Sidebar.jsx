import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, UserCheck, TrendingUp, Settings,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { getActiveNavItems } from '../../moduleRegistry'
import { clsx } from 'clsx'

// Core navigation — always visible regardless of module config
const CORE_NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', order: 1 },
  { to: '/leads',     icon: Users,           label: 'Leads',     order: 2 },
  { to: '/clients',   icon: UserCheck,       label: 'Clients',   order: 3 },
  { to: '/pipeline',  icon: TrendingUp,      label: 'Pipeline',  order: 4 },
]

// Settings is always last
const SETTINGS_NAV = { to: '/settings', icon: Settings, label: 'Settings', order: 99 }

const ScrapboxLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
    <rect x="13" y="2" width="9" height="9" rx="2" fill="currentColor" opacity="0.6" />
    <rect x="2" y="13" width="9" height="9" rx="2" fill="currentColor" opacity="0.6" />
    <rect x="13" y="13" width="9" height="9" rx="2" fill="currentColor" opacity="0.3" />
  </svg>
)

function NavItem({ item, sidebarOpen, badge }) {
  const { icon: Icon, to, label } = item
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          clsx(
            'group flex items-center gap-3 px-2 py-2 rounded-xl text-sm transition-all duration-150',
            isActive
              ? 'bg-accent text-white shadow-sm'
              : 'text-primary-300 hover:text-white hover:bg-white/5'
          )
        }
      >
        {({ isActive }) => (
          <>
            <div className="relative shrink-0">
              <Icon size={17} />
              {badge > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold leading-none">
                  {badge > 9 ? '9+' : badge}
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
                  className="whitespace-nowrap overflow-hidden font-medium"
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
}

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, unreadMessages } = useApp()

  const moduleNavItems = getActiveNavItems()

  // Split module items into main and admin section
  const mainItems  = moduleNavItems.filter(i => i.section !== 'admin')
  const adminItems = moduleNavItems.filter(i => i.section === 'admin')

  const allMain = [...CORE_NAV, ...mainItems].sort((a, b) => a.order - b.order)

  const getBadge = (item) => {
    if (item.badge === 'unreadMessages') return unreadMessages
    return 0
  }

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 220 : 60 }}
      transition={{ duration: 0.22, ease: 'easeInOut' }}
      className="relative flex flex-col h-screen bg-primary-900 border-r border-white/5 shrink-0 z-20 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-3.5 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent shrink-0 text-white">
            <ScrapboxLogo />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden"
              >
                <span className="font-bold text-white text-sm whitespace-nowrap tracking-tight">
                  Scrapbox <span className="text-accent">CRM</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden scrollbar-none">
        <ul className="space-y-0.5 px-2">
          {allMain.map(item => (
            <NavItem key={item.to} item={item} sidebarOpen={sidebarOpen} badge={getBadge(item)} />
          ))}
        </ul>

        {/* Admin section separator */}
        {adminItems.length > 0 && (
          <>
            <div className="mx-3 my-3 border-t border-white/5" />
            {sidebarOpen && (
              <p className="px-4 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-primary-500">
                Admin
              </p>
            )}
            <ul className="space-y-0.5 px-2">
              {adminItems.map(item => (
                <NavItem key={item.to} item={item} sidebarOpen={sidebarOpen} badge={getBadge(item)} />
              ))}
            </ul>
          </>
        )}
      </nav>

      {/* Settings always at bottom */}
      <div className="px-2 pb-3 pt-2 border-t border-white/5 shrink-0">
        <ul>
          <NavItem item={SETTINGS_NAV} sidebarOpen={sidebarOpen} badge={0} />
        </ul>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setSidebarOpen(o => !o)}
        className="absolute -right-3 top-[52px] w-6 h-6 rounded-full bg-primary-800 border border-white/10 text-primary-400 hover:text-white flex items-center justify-center transition-colors z-10 shadow-md"
      >
        {sidebarOpen ? <ChevronLeft size={11} /> : <ChevronRight size={11} />}
      </button>
    </motion.aside>
  )
}

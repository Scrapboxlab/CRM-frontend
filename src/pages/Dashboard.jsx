import { motion } from 'framer-motion'
import {
  Users, TrendingUp, DollarSign, Target, CheckSquare,
  Calendar, MessageSquare, ArrowRight
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList,
  PieChart, Pie, Cell
} from 'recharts'
import { StatCard } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import { useApp } from '../context/AppContext'
import { revenueData, leadsPerMonth, funnelData, leadSources, activities, teamMembers } from '../data/mock'
import { useNavigate } from 'react-router-dom'

const COLORS = ['#14B8A6', '#0D9488', '#0F766E', '#115E59', '#134E4A']

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function Dashboard() {
  const { leads, deals, tasks, events, unreadMessages } = useApp()
  const navigate = useNavigate()

  const openDeals = deals.filter(d => !['Closed Won', 'Closed Lost'].includes(d.stage))
  const monthRevenue = deals.filter(d => d.stage === 'Closed Won').reduce((s, d) => s + d.value, 0)
  const wonDeals = deals.filter(d => d.stage === 'Closed Won').length
  const convRate = deals.length ? Math.round((wonDeals / deals.length) * 100) : 0
  const pendingTasks = tasks.filter(t => t.status !== 'Completed').length
  const todayEvents = events.filter(e => e.start.startsWith('2026-05-12')).length

  const userMap = Object.fromEntries(teamMembers.map(u => [u.id, u]))

  const formatCurrency = (v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 space-y-6 max-w-screen-xl"
    >
      <motion.div variants={item}>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Good morning, Alex 👋</h1>
        <p className="text-sm text-slate-500 dark:text-primary-400">Here's what's happening with your sales today.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={leads.length} icon={Users} change={12} color="blue" />
        <StatCard label="Active Deals" value={openDeals.length} icon={TrendingUp} change={8} color="accent" />
        <StatCard label="Monthly Revenue" value={`$${(monthRevenue / 1000).toFixed(0)}k`} icon={DollarSign} change={23} color="green" />
        <StatCard label="Conversion Rate" value={`${convRate}%`} icon={Target} change={-3} color="purple" />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Tasks" value={pendingTasks} icon={CheckSquare} color="yellow" />
        <StatCard label="Today's Meetings" value={todayEvents} icon={Calendar} color="blue" />
        <StatCard label="New Messages" value={unreadMessages} icon={MessageSquare} color="purple" />
        <StatCard label="New Leads" value={leads.filter(l => l.status === 'New').length} icon={Users} color="accent" />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 dark:text-white">Revenue Overview</h2>
            <span className="text-xs text-slate-400">2026</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-primary-700" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, '']} contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="target" stroke="#CBD5E1" strokeWidth={1.5} fill="none" strokeDasharray="4 2" dot={false} name="Target" />
              <Area type="monotone" dataKey="revenue" stroke="#14B8A6" strokeWidth={2} fill="url(#revGrad)" dot={false} name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Lead Sources</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={leadSources} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {leadSources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {leadSources.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-slate-600 dark:text-primary-300">{s.name}</span>
                </div>
                <span className="font-medium text-slate-700 dark:text-white">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Leads Per Month</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={leadsPerMonth} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:stroke-primary-700" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="leads" fill="#14B8A6" radius={[4, 4, 0, 0]} name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 dark:text-white">Conversion Funnel</h2>
          </div>
          <div className="space-y-2">
            {funnelData.map((stage, i) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-primary-300">{stage.stage}</span>
                  <span className="font-medium text-slate-700 dark:text-white">{stage.count}</span>
                </div>
                <div className="h-5 bg-slate-100 dark:bg-primary-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(stage.count / funnelData[0].count) * 100}%`,
                      background: `rgba(20,184,166,${1 - i * 0.12})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 dark:text-white">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {activities.map(a => {
              const user = userMap[a.user]
              return (
                <div key={a.id} className="flex items-start gap-3">
                  <Avatar name={user?.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 dark:text-white">
                      <span className="font-medium">{user?.name}</span>
                      {' '}{a.action}{' '}
                      <span className="text-accent">{a.subject}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{new Date(a.time).toLocaleString()}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 dark:text-white">Today's Agenda</h2>
            <button onClick={() => navigate('/calendar')} className="text-xs text-accent hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {events.slice(0, 4).map(ev => (
              <div key={ev.id} className="flex gap-3">
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium text-slate-700 dark:text-white">
                    {new Date(ev.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="w-px bg-accent/30 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-white truncate">{ev.title}</p>
                  <p className="text-xs text-slate-400">{ev.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-primary-700">
            <h3 className="text-sm font-medium text-slate-700 dark:text-white mb-3">Pending Tasks</h3>
            <div className="space-y-2">
              {tasks.filter(t => t.status !== 'Completed').slice(0, 3).map(t => (
                <div key={t.id} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.status === 'Overdue' ? 'bg-red-500' : t.priority === 'High' ? 'bg-yellow-500' : 'bg-slate-300'}`} />
                  <p className="text-xs text-slate-600 dark:text-primary-300 truncate">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

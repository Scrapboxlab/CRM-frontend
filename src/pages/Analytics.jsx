import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import Card, { StatCard } from '../components/ui/Card'
import Avatar from '../components/ui/Avatar'
import { revenueData, leadsPerMonth, funnelData, leadSources } from '../data/mock'
import { teamMembers } from '../data/mock'
import { TrendingUp, DollarSign, Target, Users } from 'lucide-react'

const COLORS = ['#14B8A6', '#0D9488', '#0F766E', '#115E59', '#22C55E']

const lostReasons = [
  { reason: 'Budget constraints', count: 8 },
  { reason: 'Chose competitor', count: 6 },
  { reason: 'No decision made', count: 4 },
  { reason: 'Product fit', count: 3 },
  { reason: 'Timing', count: 2 },
]

const dealSizes = [
  { range: '<$10k', count: 12 },
  { range: '$10-25k', count: 19 },
  { range: '$25-50k', count: 14 },
  { range: '$50-100k', count: 8 },
  { range: '>$100k', count: 3 },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }

export default function Analytics() {
  const sortedReps = [...teamMembers].filter(u => u.revenue > 0).sort((a, b) => b.revenue - a.revenue)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-6 space-y-6 max-w-screen-xl">
      <motion.div variants={item}>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Analytics</h1>
        <p className="text-sm text-slate-500 dark:text-primary-400">Performance insights for your sales team</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="$1.04M" icon={DollarSign} change={18} color="green" />
        <StatCard label="Avg Deal Size" value="$42k" icon={TrendingUp} change={7} color="accent" />
        <StatCard label="Win Rate" value="34%" icon={Target} change={-2} color="purple" />
        <StatCard label="Total Leads" value="161" icon={Users} change={22} color="blue" />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, '']} contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#14B8A6" strokeWidth={2} fill="url(#revGrad2)" dot={false} name="Revenue" />
              <Area type="monotone" dataKey="target" stroke="#CBD5E1" strokeWidth={1.5} fill="none" strokeDasharray="4 2" dot={false} name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Lead Sources</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={leadSources} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {leadSources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 12 }} />
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
          <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Top Sales Reps</h2>
          <div className="space-y-3">
            {sortedReps.map((rep, i) => (
              <div key={rep.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-300 dark:text-primary-600 w-4">{i + 1}</span>
                <Avatar name={rep.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-white">{rep.name}</p>
                    <p className="text-sm font-bold text-accent">${(rep.revenue / 1000).toFixed(0)}k</p>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-primary-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${(rep.revenue / sortedReps[0].revenue) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-0.5">
                    <span>{rep.deals} deals</span>
                    <span>{Math.round((rep.revenue / rep.target) * 100)}% of target</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Lost Deal Reasons</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={lostReasons} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="reason" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} width={120} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="count" fill="#EF4444" radius={[0, 4, 4, 0]} name="Deals" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Leads Per Month</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={leadsPerMonth} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="leads" fill="#14B8A6" radius={[4, 4, 0, 0]} name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Deal Size Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dealSizes} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Deals" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Conversion Funnel</h2>
          <div className="flex items-end justify-center gap-4">
            {funnelData.map((stage, i) => {
              const pct = (stage.count / funnelData[0].count) * 100
              const convRate = i > 0 ? Math.round((stage.count / funnelData[i - 1].count) * 100) : 100
              return (
                <div key={stage.stage} className="flex flex-col items-center gap-2">
                  <p className="text-xs font-medium text-slate-700 dark:text-white">{stage.count}</p>
                  <div className="relative" style={{ width: `${60 + (funnelData.length - i - 1) * 20}px`, height: `${Math.max(pct * 2, 20)}px` }}>
                    <div className="w-full h-full rounded-lg" style={{ background: `rgba(20,184,166,${1 - i * 0.12})` }} />
                  </div>
                  <p className="text-[11px] text-slate-400 text-center">{stage.stage}</p>
                  {i > 0 && <p className="text-[10px] text-slate-300 dark:text-primary-600">{convRate}%</p>}
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

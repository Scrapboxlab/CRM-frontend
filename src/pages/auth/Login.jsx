import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Zap, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: 'alex.morgan@scrapbox.io', password: 'password' })
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('Please fill in all fields'); return }
    const ok = await login(form.email, form.password)
    if (ok) navigate('/dashboard')
    else setError('Invalid credentials')
  }

  return (
    <div className="min-h-screen bg-primary-900 flex">
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
        <div className="relative max-w-md text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Zap size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">Scrapbox CRM</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Manage your sales<br />pipeline with clarity.
            </h1>
            <p className="text-primary-300 text-lg">
              Track leads, close deals, and grow your business with a modern CRM built for performance teams.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { label: 'Active Deals', value: '$1.2M' },
                { label: 'Conversion Rate', value: '34%' },
                { label: 'Team Members', value: '12' },
              ].map(stat => (
                <div key={stat.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-primary-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-[440px] flex items-center justify-center p-8 bg-white dark:bg-primary-800">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm"
        >
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-slate-800 dark:text-white">Scrapbox CRM</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Welcome back</h2>
          <p className="text-sm text-slate-500 dark:text-primary-400 mb-8">Sign in to your workspace</p>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              icon={Mail}
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700 dark:text-primary-200">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full pl-9 pr-10 py-2 border border-slate-200 dark:border-primary-600 rounded-lg text-sm bg-white dark:bg-primary-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent/30"
                />
                <span className="text-sm text-slate-600 dark:text-primary-300">Remember me</span>
              </label>
              <button type="button" className="text-sm text-accent hover:underline">Forgot password?</button>
            </div>

            <Button type="submit" loading={loading} className="w-full justify-center mt-2">
              Sign in
            </Button>
          </form>

          <p className="text-sm text-slate-500 dark:text-primary-400 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent font-medium hover:underline">Create one</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

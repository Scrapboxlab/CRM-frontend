import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, User, Mail, Lock, Zap, Briefcase } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Select } from '../../components/ui/Input'

const industries = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Legal', 'Real Estate', 'Education', 'Other']

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ company: '', name: '', email: '', password: '', industry: 'Technology' })
  const [error, setError] = useState('')

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.company || !form.name || !form.email || !form.password) {
      setError('Please fill in all required fields')
      return
    }
    const ok = await register(form)
    if (ok) navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-slate-800 dark:text-white">Scrapbox CRM</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Create your workspace</h2>
        <p className="text-sm text-slate-500 dark:text-primary-400 mb-8">Start managing your sales pipeline in minutes</p>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Company name" placeholder="Acme Corp" icon={Building2} value={form.company} onChange={set('company')} required />
          <Input label="Your name" placeholder="John Doe" icon={User} value={form.name} onChange={set('name')} required />
          <Input label="Work email" type="email" placeholder="you@company.com" icon={Mail} value={form.email} onChange={set('email')} required />
          <Input label="Password" type="password" placeholder="Min. 8 characters" icon={Lock} value={form.password} onChange={set('password')} required />
          <Select label="Industry" value={form.industry} onChange={set('industry')}>
            {industries.map(i => <option key={i}>{i}</option>)}
          </Select>

          <Button type="submit" loading={loading} className="w-full justify-center mt-2">
            Create workspace
          </Button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-4">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>

        <p className="text-sm text-slate-500 dark:text-primary-400 text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}

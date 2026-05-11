import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Shield, TrendingUp, CheckSquare, Target } from 'lucide-react'
import { teamMembers } from '../data/mock'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'
import Input, { Select } from '../components/ui/Input'
import Avatar from '../components/ui/Avatar'

const roleStyle = {
  admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  manager: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  sales_rep: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  support: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

const roleLabel = {
  admin: 'Admin',
  manager: 'Manager',
  sales_rep: 'Sales Rep',
  support: 'Support',
}

export default function Team() {
  const [members, setMembers] = useState(teamMembers)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', role: 'sales_rep', title: '' })

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleInvite = () => {
    const initials = form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    setMembers(prev => [...prev, { ...form, id: `u${Date.now()}`, initials, deals: 0, tasks: 0, revenue: 0, target: 100000 }])
    setInviteOpen(false)
    setForm({ name: '', email: '', role: 'sales_rep', title: '' })
  }

  return (
    <div className="p-6 space-y-5 max-w-screen-xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Team</h1>
          <p className="text-sm text-slate-500 dark:text-primary-400">{members.length} members</p>
        </div>
        <Button icon={UserPlus} onClick={() => setInviteOpen(true)}>Invite Member</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {['admin', 'manager', 'sales_rep', 'support'].map(role => (
          <Card key={role} className="p-4">
            <p className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block mb-2 ${roleStyle[role]}`}>{roleLabel[role]}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{members.filter(m => m.role === role).length}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(member => (
          <motion.div key={member.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card hover onClick={() => setSelected(member)} className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={member.name} size="lg" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">{member.name}</p>
                    <p className="text-xs text-slate-400">{member.title}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleStyle[member.role]}`}>{roleLabel[member.role]}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-primary-400">{member.email}</p>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-primary-700">
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-700 dark:text-white">{member.deals}</p>
                  <p className="text-[11px] text-slate-400">Deals</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-700 dark:text-white">{member.tasks}</p>
                  <p className="text-[11px] text-slate-400">Tasks</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-accent">${(member.revenue / 1000).toFixed(0)}k</p>
                  <p className="text-[11px] text-slate-400">Revenue</p>
                </div>
              </div>
              {member.target > 0 && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Target progress</span>
                    <span className="text-accent font-medium">{Math.round((member.revenue / member.target) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-primary-700 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${Math.min((member.revenue / member.target) * 100, 100)}%` }} />
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ''} size="md">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar name={selected.name} size="xl" />
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-lg">{selected.name}</p>
                <p className="text-sm text-slate-400">{selected.title}</p>
                <p className="text-sm text-slate-400">{selected.email}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${roleStyle[selected.role]}`}>{roleLabel[selected.role]}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: TrendingUp, label: 'Active Deals', value: selected.deals },
                { icon: CheckSquare, label: 'Open Tasks', value: selected.tasks },
                { icon: Target, label: 'Revenue', value: `$${(selected.revenue / 1000).toFixed(0)}k` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-slate-50 dark:bg-primary-700 rounded-xl p-3 text-center">
                  <Icon size={16} className="mx-auto text-accent mb-1" />
                  <p className="font-bold text-slate-800 dark:text-white">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>
            {selected.target > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 dark:text-primary-300">Revenue target</span>
                  <span className="font-medium text-slate-700 dark:text-white">${(selected.revenue / 1000).toFixed(0)}k / ${(selected.target / 1000).toFixed(0)}k</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-primary-700 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${Math.min((selected.revenue / selected.target) * 100, 100)}%` }} />
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite Team Member">
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Jane Smith" value={form.name} onChange={set('name')} />
          <Input label="Email" type="email" placeholder="jane@company.com" value={form.email} onChange={set('email')} />
          <Input label="Job Title" placeholder="Senior Sales Rep" value={form.title} onChange={set('title')} />
          <Select label="Role" value={form.role} onChange={set('role')}>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="sales_rep">Sales Rep</option>
            <option value="support">Support</option>
          </Select>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setInviteOpen(false)}>Cancel</Button>
          <Button icon={UserPlus} onClick={handleInvite}>Send Invitation</Button>
        </div>
      </Modal>
    </div>
  )
}

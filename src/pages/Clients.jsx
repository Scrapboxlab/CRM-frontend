import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, UserCheck, Pencil, Trash2, ExternalLink, Phone, Mail, Building2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { teamMembers } from '../data/mock'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { StatusBadge } from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import Input, { Select, Textarea } from '../components/ui/Input'
import EmptyState from '../components/ui/EmptyState'

const INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Legal', 'Logistics', 'Fintech', 'Other']
const STATUSES = ['Active', 'At Risk', 'Inactive']
const TABS = ['Overview', 'Deals', 'Tasks', 'Notes', 'History']

const defaultForm = { name: '', company: '', email: '', phone: '', industry: 'Technology', status: 'Active', assignedManager: 'u1', address: '', website: '' }

export default function Clients() {
  const { clients, addClient, updateClient, deals, tasks } = useApp()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [editClient, setEditClient] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [form, setForm] = useState(defaultForm)
  const [tab, setTab] = useState('Overview')

  const userMap = Object.fromEntries(teamMembers.map(u => [u.id, u]))

  const filtered = useMemo(() => clients.filter(c => {
    const q = search.toLowerCase()
    if (q && !c.name.toLowerCase().includes(q) && !c.company.toLowerCase().includes(q)) return false
    if (filterStatus && c.status !== filterStatus) return false
    return true
  }), [clients, search, filterStatus])

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const openEdit = (client) => { setForm({ ...client }); setEditClient(client) }

  const handleSave = () => {
    if (editClient) { updateClient(editClient.id, form); setEditClient(null) }
    else { addClient(form); setAddOpen(false) }
  }

  const clientDeals = selected ? deals.filter(d => d.client === selected.id) : []
  const clientTasks = selected ? tasks.filter(t => t.relatedTo === selected.id) : []

  return (
    <div className="p-6 space-y-5 max-w-screen-xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Clients</h1>
          <p className="text-sm text-slate-500 dark:text-primary-400">{clients.length} total clients</p>
        </div>
        <Button icon={Plus} onClick={() => { setForm(defaultForm); setAddOpen(true) }}>Add Client</Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-slate-700 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-slate-600 dark:text-primary-300 focus:outline-none">
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && <div className="col-span-full"><EmptyState icon={UserCheck} title="No clients found" /></div>}
        {filtered.map(client => (
          <motion.div key={client.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card hover onClick={() => setSelected(client)} className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={client.company} size="md" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white text-sm">{client.company}</p>
                    <p className="text-xs text-slate-400">{client.name}</p>
                  </div>
                </div>
                <StatusBadge status={client.status} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-primary-400">
                  <Mail size={11} /><span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-primary-400">
                  <Building2 size={11} /><span>{client.industry}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-primary-700">
                <div>
                  <p className="text-xs text-slate-400">Revenue</p>
                  <p className="text-sm font-bold text-accent">${(client.totalRevenue / 1000).toFixed(0)}k</p>
                </div>
                <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                  <button onClick={() => openEdit(client)} className="p-1.5 rounded-lg text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors"><Pencil size={13} /></button>
                  <button onClick={() => setDeletingId(client.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.company || ''} size="xl">
        {selected && (
          <div>
            <div className="flex gap-4 border-b border-slate-100 dark:border-primary-700 mb-6 -mt-2">
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-accent text-accent' : 'border-transparent text-slate-500 dark:text-primary-400 hover:text-slate-700 dark:hover:text-white'}`}>
                  {t}
                </button>
              ))}
            </div>

            {tab === 'Overview' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Contact</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{selected.name}</p>
                    <p className="text-sm text-slate-500 dark:text-primary-400">{selected.email}</p>
                    <p className="text-sm text-slate-500 dark:text-primary-400">{selected.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Company Details</p>
                    <p className="text-sm text-slate-700 dark:text-white">{selected.industry}</p>
                    <p className="text-sm text-slate-500 dark:text-primary-400">{selected.address}</p>
                    <a href="#" className="text-sm text-accent flex items-center gap-1 mt-1"><ExternalLink size={12} />{selected.website}</a>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Total Revenue', value: `$${(selected.totalRevenue / 1000).toFixed(0)}k` },
                      { label: 'Total Deals', value: selected.deals },
                      { label: 'Client Since', value: selected.since },
                      { label: 'Status', value: <StatusBadge status={selected.status} /> },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-slate-50 dark:bg-primary-700 rounded-xl p-3">
                        <p className="text-xs text-slate-400 mb-1">{label}</p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Account Manager</p>
                    {userMap[selected.assignedManager] && (
                      <div className="flex items-center gap-2">
                        <Avatar name={userMap[selected.assignedManager].name} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-white">{userMap[selected.assignedManager].name}</p>
                          <p className="text-xs text-slate-400">{userMap[selected.assignedManager].title}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {tab === 'Deals' && (
              <div className="space-y-3">
                {clientDeals.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No deals for this client</p>}
                {clientDeals.map(deal => (
                  <div key={deal.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-primary-700 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white">{deal.title}</p>
                      <p className="text-xs text-slate-400">Close: {deal.closeDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-accent">${deal.value.toLocaleString()}</p>
                      <StatusBadge status={deal.stage} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'Tasks' && (
              <div className="space-y-3">
                {clientTasks.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No tasks for this client</p>}
                {clientTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-primary-700 rounded-xl">
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{task.title}</p>
                    <StatusBadge status={task.status} />
                  </div>
                ))}
              </div>
            )}

            {(tab === 'Notes' || tab === 'History') && (
              <p className="text-sm text-slate-400 text-center py-12">Coming soon</p>
            )}
          </div>
        )}
      </Modal>

      <Modal open={addOpen || !!editClient} onClose={() => { setAddOpen(false); setEditClient(null) }} title={editClient ? 'Edit Client' : 'Add Client'} size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Contact Name" placeholder="Jane Smith" value={form.name} onChange={set('name')} />
          <Input label="Company Name" placeholder="Acme Corp" value={form.company} onChange={set('company')} />
          <Input label="Email" type="email" placeholder="jane@acme.com" value={form.email} onChange={set('email')} />
          <Input label="Phone" placeholder="+1 555 0000" value={form.phone} onChange={set('phone')} />
          <Select label="Industry" value={form.industry} onChange={set('industry')}>
            {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
          </Select>
          <Select label="Status" value={form.status} onChange={set('status')}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </Select>
          <Select label="Account Manager" value={form.assignedManager} onChange={set('assignedManager')}>
            {teamMembers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </Select>
          <Input label="Website" placeholder="acme.com" value={form.website} onChange={set('website')} />
          <div className="sm:col-span-2">
            <Input label="Address" placeholder="123 Main St, City, State" value={form.address} onChange={set('address')} />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => { setAddOpen(false); setEditClient(null) }}>Cancel</Button>
          <Button onClick={handleSave}>{editClient ? 'Save Changes' : 'Add Client'}</Button>
        </div>
      </Modal>

      <ConfirmDialog open={!!deletingId} onClose={() => setDeletingId(null)} onConfirm={() => {}} title="Delete Client" message="Are you sure you want to delete this client? All associated data will be removed." />
    </div>
  )
}

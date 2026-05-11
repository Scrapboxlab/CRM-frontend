import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, LayoutGrid, List, Kanban, Filter, Pencil, Trash2, UserCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { teamMembers } from '../data/mock'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { StatusBadge, PriorityBadge } from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import Input, { Select, Textarea } from '../components/ui/Input'
import EmptyState from '../components/ui/EmptyState'
import Pagination from '../components/ui/Pagination'

const STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost']
const SOURCES = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Trade Show', 'Email Campaign']
const PRIORITIES = ['High', 'Medium', 'Low']
const PAGE_SIZE = 8

const statusCols = STATUSES.slice(0, 5)

const defaultForm = { name: '', company: '', email: '', phone: '', source: 'Website', status: 'New', assignedTo: 'u1', value: '', priority: 'Medium', notes: '', tags: '' }

export default function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useApp()
  const [view, setView] = useState('table')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ status: '', source: '', priority: '' })
  const [page, setPage] = useState(1)
  const [addOpen, setAddOpen] = useState(false)
  const [editLead, setEditLead] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [form, setForm] = useState(defaultForm)

  const userMap = Object.fromEntries(teamMembers.map(u => [u.id, u]))

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const q = search.toLowerCase()
      if (q && !l.name.toLowerCase().includes(q) && !l.company.toLowerCase().includes(q) && !l.email.toLowerCase().includes(q)) return false
      if (filters.status && l.status !== filters.status) return false
      if (filters.source && l.source !== filters.source) return false
      if (filters.priority && l.priority !== filters.priority) return false
      return true
    })
  }, [leads, search, filters])

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  const openAdd = () => { setForm(defaultForm); setAddOpen(true) }
  const openEdit = (lead) => {
    setForm({ ...lead, tags: lead.tags?.join(', ') || '' })
    setEditLead(lead)
  }

  const handleSave = () => {
    const data = { ...form, value: Number(form.value), tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
    if (editLead) { updateLead(editLead.id, data); setEditLead(null) }
    else { addLead(data); setAddOpen(false) }
  }

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  return (
    <div className="p-6 space-y-5 max-w-screen-xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Leads</h1>
          <p className="text-sm text-slate-500 dark:text-primary-400">{leads.length} total leads</p>
        </div>
        <Button icon={Plus} onClick={openAdd}>Add Lead</Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search leads..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-slate-700 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
        </div>
        <select value={filters.status} onChange={e => { setFilters(f => ({ ...f, status: e.target.value })); setPage(1) }}
          className="px-3 py-2 text-sm border border-slate-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-slate-600 dark:text-primary-300 focus:outline-none focus:ring-2 focus:ring-accent/30">
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filters.priority} onChange={e => { setFilters(f => ({ ...f, priority: e.target.value })); setPage(1) }}
          className="px-3 py-2 text-sm border border-slate-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-slate-600 dark:text-primary-300 focus:outline-none focus:ring-2 focus:ring-accent/30">
          <option value="">All Priority</option>
          {PRIORITIES.map(p => <option key={p}>{p}</option>)}
        </select>
        <div className="flex border border-slate-200 dark:border-primary-600 rounded-lg overflow-hidden">
          {[['table', <List size={15} />], ['grid', <LayoutGrid size={15} />], ['kanban', <Kanban size={15} />]].map(([v, icon]) => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-2 text-sm transition-colors ${view === v ? 'bg-accent text-white' : 'bg-white dark:bg-primary-700 text-slate-500 dark:text-primary-400 hover:bg-slate-50 dark:hover:bg-primary-600'}`}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      {view === 'table' && (
        <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-primary-700">
                  <th className="text-left text-xs font-medium text-slate-500 dark:text-primary-400 px-4 py-3">Lead</th>
                  <th className="text-left text-xs font-medium text-slate-500 dark:text-primary-400 px-4 py-3">Source</th>
                  <th className="text-left text-xs font-medium text-slate-500 dark:text-primary-400 px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-slate-500 dark:text-primary-400 px-4 py-3">Priority</th>
                  <th className="text-left text-xs font-medium text-slate-500 dark:text-primary-400 px-4 py-3">Value</th>
                  <th className="text-left text-xs font-medium text-slate-500 dark:text-primary-400 px-4 py-3">Assigned</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-primary-700">
                {paginated.length === 0 && (
                  <tr><td colSpan={7}><EmptyState icon={UserCheck} title="No leads found" description="Try adjusting your filters or add a new lead." /></td></tr>
                )}
                {paginated.map(lead => (
                  <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="hover:bg-slate-50 dark:hover:bg-primary-700/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={lead.name} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-white">{lead.name}</p>
                          <p className="text-xs text-slate-400">{lead.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-primary-300">{lead.source}</td>
                    <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                    <td className="px-4 py-3"><PriorityBadge priority={lead.priority} /></td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-white">${Number(lead.value).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {userMap[lead.assignedTo] && (
                        <div className="flex items-center gap-2">
                          <Avatar name={userMap[lead.assignedTo].name} size="xs" />
                          <span className="text-xs text-slate-500 dark:text-primary-400">{userMap[lead.assignedTo].name.split(' ')[0]}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(lead)} className="p-1.5 rounded-lg text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors"><Pencil size={13} /></button>
                        <button onClick={() => setDeletingId(lead.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-primary-700">
              <p className="text-xs text-slate-400">{filtered.length} results</p>
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>
          )}
        </div>
      )}

      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginated.length === 0 && <div className="col-span-full"><EmptyState icon={UserCheck} title="No leads found" /></div>}
          {paginated.map(lead => (
            <motion.div key={lead.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card hover className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar name={lead.name} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white">{lead.name}</p>
                      <p className="text-xs text-slate-400">{lead.company}</p>
                    </div>
                  </div>
                  <PriorityBadge priority={lead.priority} />
                </div>
                <div className="flex items-center justify-between">
                  <StatusBadge status={lead.status} />
                  <span className="text-sm font-semibold text-accent">${Number(lead.value).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-primary-700">
                  <span className="text-xs text-slate-400">{lead.source}</span>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(lead)} className="p-1 rounded text-slate-400 hover:text-accent transition-colors"><Pencil size={12} /></button>
                    <button onClick={() => setDeletingId(lead.id)} className="p-1 rounded text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={12} /></button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {view === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {statusCols.map(col => {
            const colLeads = leads.filter(l => l.status === col)
            return (
              <div key={col} className="shrink-0 w-64">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-white">{col}</h3>
                  <span className="text-xs bg-slate-100 dark:bg-primary-700 text-slate-500 dark:text-primary-300 px-2 py-0.5 rounded-full">{colLeads.length}</span>
                </div>
                <div className="space-y-3 min-h-[200px] bg-slate-50 dark:bg-primary-900/50 rounded-xl p-2">
                  {colLeads.map(lead => (
                    <Card key={lead.id} className="p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar name={lead.name} size="xs" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-800 dark:text-white truncate">{lead.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{lead.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <PriorityBadge priority={lead.priority} />
                        <span className="text-xs font-medium text-accent">${(Number(lead.value) / 1000).toFixed(0)}k</span>
                      </div>
                    </Card>
                  ))}
                  {colLeads.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6">No leads</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={addOpen || !!editLead} onClose={() => { setAddOpen(false); setEditLead(null) }} title={editLead ? 'Edit Lead' : 'Add Lead'} size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" placeholder="Jane Smith" value={form.name} onChange={set('name')} />
          <Input label="Company" placeholder="Acme Corp" value={form.company} onChange={set('company')} />
          <Input label="Email" type="email" placeholder="jane@acme.com" value={form.email} onChange={set('email')} />
          <Input label="Phone" placeholder="+1 555 0000" value={form.phone} onChange={set('phone')} />
          <Select label="Source" value={form.source} onChange={set('source')}>
            {SOURCES.map(s => <option key={s}>{s}</option>)}
          </Select>
          <Select label="Status" value={form.status} onChange={set('status')}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </Select>
          <Select label="Priority" value={form.priority} onChange={set('priority')}>
            {PRIORITIES.map(p => <option key={p}>{p}</option>)}
          </Select>
          <Input label="Deal Value ($)" type="number" placeholder="0" value={form.value} onChange={set('value')} />
          <Select label="Assigned To" value={form.assignedTo} onChange={set('assignedTo')}>
            {teamMembers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </Select>
          <Input label="Tags (comma separated)" placeholder="Enterprise, SaaS" value={form.tags} onChange={set('tags')} />
          <div className="sm:col-span-2">
            <Textarea label="Notes" placeholder="Any notes about this lead..." value={form.notes} onChange={set('notes')} rows={3} />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => { setAddOpen(false); setEditLead(null) }}>Cancel</Button>
          <Button onClick={handleSave}>{editLead ? 'Save Changes' : 'Add Lead'}</Button>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deleteLead(deletingId)}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
      />
    </div>
  )
}

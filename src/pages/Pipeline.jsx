import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, DollarSign, Calendar, User, GripVertical, Archive } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { teamMembers, clients as clientsData } from '../data/mock'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { StatusBadge } from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import Modal from '../components/ui/Modal'
import Input, { Select } from '../components/ui/Input'

const STAGES = ['Prospect', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']

const stageColors = {
  'Prospect': 'border-slate-300 dark:border-primary-600',
  'Qualified': 'border-blue-400',
  'Proposal': 'border-yellow-400',
  'Negotiation': 'border-purple-400',
  'Closed Won': 'border-green-400',
  'Closed Lost': 'border-red-400',
}

const defaultForm = { title: '', client: '', value: '', probability: '50', stage: 'Prospect', owner: 'u1', closeDate: '', notes: '' }

export default function Pipeline() {
  const { deals, addDeal, updateDeal } = useApp()
  const [addOpen, setAddOpen] = useState(false)
  const [editDeal, setEditDeal] = useState(null)
  const [form, setForm] = useState(defaultForm)
  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)

  const userMap = Object.fromEntries(teamMembers.map(u => [u.id, u]))
  const clientMap = Object.fromEntries(clientsData.map(c => [c.id, c]))

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const openEdit = (deal) => {
    setForm({ ...deal, value: String(deal.value), probability: String(deal.probability), client: deal.client || '' })
    setEditDeal(deal)
  }

  const handleSave = () => {
    const data = { ...form, value: Number(form.value), probability: Number(form.probability), client: form.client || null }
    if (editDeal) { updateDeal(editDeal.id, data); setEditDeal(null) }
    else { addDeal(data); setAddOpen(false) }
  }

  const handleDrop = (stage) => {
    if (dragging && dragging !== stage) {
      const deal = deals.find(d => d.id === dragging)
      if (deal) updateDeal(deal.id, { stage })
    }
    setDragging(null)
    setDragOver(null)
  }

  const totalValue = deals.filter(d => d.stage !== 'Closed Lost').reduce((s, d) => s + d.value, 0)
  const wonValue = deals.filter(d => d.stage === 'Closed Won').reduce((s, d) => s + d.value, 0)

  return (
    <div className="p-6 space-y-5 h-full flex flex-col max-w-screen-2xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Sales Pipeline</h1>
          <p className="text-sm text-slate-500 dark:text-primary-400">
            {deals.filter(d => !d.stage.startsWith('Closed')).length} active deals · ${(totalValue / 1000).toFixed(0)}k pipeline · ${(wonValue / 1000).toFixed(0)}k won
          </p>
        </div>
        <Button icon={Plus} onClick={() => { setForm(defaultForm); setAddOpen(true) }}>Add Deal</Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
        {STAGES.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage)
          const stageValue = stageDeals.reduce((s, d) => s + d.value, 0)
          const isOver = dragOver === stage

          return (
            <div
              key={stage}
              className={`shrink-0 w-72 flex flex-col transition-all ${isOver ? 'scale-[1.01]' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(stage) }}
              onDrop={() => handleDrop(stage)}
              onDragLeave={() => setDragOver(null)}
            >
              <div className={`rounded-t-xl border-t-2 ${stageColors[stage]} bg-slate-50 dark:bg-primary-900/60 px-3 py-2.5`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700 dark:text-white">{stage}</span>
                  <span className="text-xs bg-white dark:bg-primary-700 text-slate-500 dark:text-primary-300 px-2 py-0.5 rounded-full border border-slate-200 dark:border-primary-600">
                    {stageDeals.length}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">${(stageValue / 1000).toFixed(0)}k</p>
              </div>

              <div className={`flex-1 min-h-[300px] bg-slate-50 dark:bg-primary-900/40 rounded-b-xl p-2 space-y-2 transition-all ${isOver ? 'bg-accent/5' : ''}`}>
                {stageDeals.map(deal => (
                  <motion.div
                    key={deal.id}
                    layout
                    draggable
                    onDragStart={() => setDragging(deal.id)}
                    onDragEnd={() => setDragging(null)}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <Card
                      onClick={() => openEdit(deal)}
                      className="p-3 space-y-2.5 hover:shadow-sm hover:border-accent/30 cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-slate-800 dark:text-white leading-snug">{deal.title}</p>
                        <GripVertical size={13} className="text-slate-300 dark:text-primary-600 shrink-0 mt-0.5" />
                      </div>
                      {deal.client && clientMap[deal.client] && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-primary-400">
                          <Avatar name={clientMap[deal.client].company} size="xs" />
                          <span>{clientMap[deal.client].company}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-accent">${deal.value.toLocaleString()}</span>
                        <span className="text-xs text-slate-400">{deal.probability}%</span>
                      </div>
                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-primary-700">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar size={10} />
                          <span>{deal.closeDate}</span>
                        </div>
                        {userMap[deal.owner] && <Avatar name={userMap[deal.owner].name} size="xs" />}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <Modal open={addOpen || !!editDeal} onClose={() => { setAddOpen(false); setEditDeal(null) }} title={editDeal ? 'Edit Deal' : 'New Deal'} size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input label="Deal Title" placeholder="Enterprise License - Acme Corp" value={form.title} onChange={set('title')} />
          </div>
          <Select label="Client" value={form.client} onChange={set('client')}>
            <option value="">No client (lead)</option>
            {clientsData.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
          </Select>
          <Select label="Stage" value={form.stage} onChange={set('stage')}>
            {STAGES.map(s => <option key={s}>{s}</option>)}
          </Select>
          <Input label="Deal Value ($)" type="number" placeholder="0" value={form.value} onChange={set('value')} />
          <Input label="Probability (%)" type="number" min="0" max="100" placeholder="50" value={form.probability} onChange={set('probability')} />
          <Input label="Expected Close Date" type="date" value={form.closeDate} onChange={set('closeDate')} />
          <Select label="Owner" value={form.owner} onChange={set('owner')}>
            {teamMembers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </Select>
          <div className="sm:col-span-2">
            <Input label="Notes" placeholder="Any notes about this deal..." value={form.notes} onChange={set('notes')} />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => { setAddOpen(false); setEditDeal(null) }}>Cancel</Button>
          <Button onClick={handleSave}>{editDeal ? 'Save Changes' : 'Create Deal'}</Button>
        </div>
      </Modal>
    </div>
  )
}

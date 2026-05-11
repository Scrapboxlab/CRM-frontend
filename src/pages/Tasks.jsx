import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, CheckSquare, Clock, AlertCircle, Check, Pencil, Trash2 } from 'lucide-react'
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

const STATUSES = ['Pending', 'In Progress', 'Completed', 'Overdue']
const PRIORITIES = ['High', 'Medium', 'Low']
const defaultForm = { title: '', description: '', dueDate: '', priority: 'Medium', assignee: 'u1', status: 'Pending', type: 'personal' }

const statusIcon = {
  'Pending': <Clock size={14} className="text-yellow-500" />,
  'In Progress': <AlertCircle size={14} className="text-blue-500" />,
  'Completed': <Check size={14} className="text-green-500" />,
  'Overdue': <AlertCircle size={14} className="text-red-500" />,
}

export default function Tasks() {
  const { tasks, addTask, updateTask, deleteTask } = useApp()
  const [view, setView] = useState('list')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [form, setForm] = useState(defaultForm)

  const userMap = Object.fromEntries(teamMembers.map(u => [u.id, u]))
  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const filtered = useMemo(() => tasks.filter(t => {
    if (filterStatus && t.status !== filterStatus) return false
    if (filterPriority && t.priority !== filterPriority) return false
    return true
  }), [tasks, filterStatus, filterPriority])

  const openEdit = (task) => { setForm({ ...task }); setEditTask(task) }
  const handleSave = () => {
    if (editTask) { updateTask(editTask.id, form); setEditTask(null) }
    else { addTask(form); setAddOpen(false) }
  }

  const kanbanCols = STATUSES.map(s => ({ status: s, tasks: filtered.filter(t => t.status === s) }))

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    overdue: tasks.filter(t => t.status === 'Overdue').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
  }

  return (
    <div className="p-6 space-y-5 max-w-screen-xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Tasks</h1>
          <p className="text-sm text-slate-500 dark:text-primary-400">{stats.total} tasks · {stats.completed} completed · {stats.overdue} overdue</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-slate-200 dark:border-primary-600 rounded-lg overflow-hidden">
            {['list', 'kanban'].map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 text-sm capitalize transition-colors ${view === v ? 'bg-accent text-white' : 'bg-white dark:bg-primary-700 text-slate-500 dark:text-primary-400 hover:bg-slate-50 dark:hover:bg-primary-600'}`}>
                {v}
              </button>
            ))}
          </div>
          <Button icon={Plus} onClick={() => { setForm(defaultForm); setAddOpen(true) }}>Add Task</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: stats.total, color: 'text-slate-700 dark:text-white' },
          { label: 'In Progress', value: stats.inProgress, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Completed', value: stats.completed, color: 'text-green-600 dark:text-green-400' },
          { label: 'Overdue', value: stats.overdue, color: 'text-red-600 dark:text-red-400' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-slate-400">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-slate-600 dark:text-primary-300 focus:outline-none">
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-slate-600 dark:text-primary-300 focus:outline-none">
          <option value="">All Priority</option>
          {PRIORITIES.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      {view === 'list' && (
        <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl overflow-hidden">
          {filtered.length === 0 && <EmptyState icon={CheckSquare} title="No tasks found" />}
          <div className="divide-y divide-slate-50 dark:divide-primary-700">
            {filtered.map(task => (
              <motion.div key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-primary-700/50 transition-colors group">
                <button
                  onClick={() => updateTask(task.id, { status: task.status === 'Completed' ? 'Pending' : 'Completed' })}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${task.status === 'Completed' ? 'bg-green-500 border-green-500' : 'border-slate-300 dark:border-primary-500 hover:border-accent'}`}
                >
                  {task.status === 'Completed' && <Check size={10} className="text-white" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${task.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>{task.title}</p>
                  {task.description && <p className="text-xs text-slate-400 truncate">{task.description}</p>}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <PriorityBadge priority={task.priority} />
                  <StatusBadge status={task.status} />
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock size={11} />
                    <span>{task.dueDate}</span>
                  </div>
                  {userMap[task.assignee] && <Avatar name={userMap[task.assignee].name} size="xs" />}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(task)} className="p-1 rounded text-slate-400 hover:text-accent transition-colors"><Pencil size={13} /></button>
                    <button onClick={() => setDeletingId(task.id)} className="p-1 rounded text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {view === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {kanbanCols.map(({ status, tasks: colTasks }) => (
            <div key={status} className="shrink-0 w-64">
              <div className="flex items-center gap-2 mb-3">
                {statusIcon[status]}
                <h3 className="text-sm font-semibold text-slate-700 dark:text-white">{status}</h3>
                <span className="ml-auto text-xs bg-slate-100 dark:bg-primary-700 text-slate-500 dark:text-primary-300 px-2 py-0.5 rounded-full">{colTasks.length}</span>
              </div>
              <div className="space-y-2 min-h-[200px] bg-slate-50 dark:bg-primary-900/40 rounded-xl p-2">
                {colTasks.map(task => (
                  <Card key={task.id} className="p-3 space-y-2">
                    <p className="text-xs font-medium text-slate-800 dark:text-white">{task.title}</p>
                    <div className="flex items-center justify-between">
                      <PriorityBadge priority={task.priority} />
                      {userMap[task.assignee] && <Avatar name={userMap[task.assignee].name} size="xs" />}
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock size={10} />{task.dueDate}
                    </p>
                  </Card>
                ))}
                {colTasks.length === 0 && <p className="text-xs text-slate-400 text-center py-6">No tasks</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={addOpen || !!editTask} onClose={() => { setAddOpen(false); setEditTask(null) }} title={editTask ? 'Edit Task' : 'New Task'}>
        <div className="space-y-4">
          <Input label="Title" placeholder="Task title" value={form.title} onChange={set('title')} />
          <Textarea label="Description" placeholder="Task details..." value={form.description} onChange={set('description')} rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Due Date" type="date" value={form.dueDate} onChange={set('dueDate')} />
            <Select label="Priority" value={form.priority} onChange={set('priority')}>
              {PRIORITIES.map(p => <option key={p}>{p}</option>)}
            </Select>
            <Select label="Status" value={form.status} onChange={set('status')}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </Select>
            <Select label="Assignee" value={form.assignee} onChange={set('assignee')}>
              {teamMembers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => { setAddOpen(false); setEditTask(null) }}>Cancel</Button>
          <Button onClick={handleSave}>{editTask ? 'Save Changes' : 'Create Task'}</Button>
        </div>
      </Modal>

      <ConfirmDialog open={!!deletingId} onClose={() => setDeletingId(null)} onConfirm={() => deleteTask(deletingId)} title="Delete Task" message="Delete this task permanently?" />
    </div>
  )
}

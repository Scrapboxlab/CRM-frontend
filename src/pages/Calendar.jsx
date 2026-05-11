import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus, Video, Phone, Users, Bell } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { teamMembers } from '../data/mock'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Input, { Select, Textarea } from '../components/ui/Input'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const EVENT_TYPES = ['meeting', 'call', 'demo', 'follow-up']

const typeStyle = {
  meeting: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  call: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  demo: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'follow-up': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
}

const typeIcon = {
  meeting: <Users size={11} />,
  call: <Phone size={11} />,
  demo: <Video size={11} />,
  'follow-up': <Bell size={11} />,
}

const defaultForm = { title: '', type: 'meeting', start: '', end: '', location: '', notes: '', recurring: false }

export default function Calendar() {
  const { events, addEvent, deleteEvent } = useApp()
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1))
  const [view, setView] = useState('month')
  const [addOpen, setAddOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [form, setForm] = useState(defaultForm)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()

  const cells = []
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, current: false })
  for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, current: true })
  const remaining = 42 - cells.length
  for (let i = 1; i <= remaining; i++) cells.push({ day: i, current: false })

  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(e => e.start.startsWith(dateStr))
  }

  const prev = () => setCurrentDate(new Date(year, month - 1, 1))
  const next = () => setCurrentDate(new Date(year, month + 1, 1))

  const handleAdd = () => {
    addEvent(form)
    setAddOpen(false)
    setForm(defaultForm)
  }

  const today = new Date()
  const isToday = (day) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === day

  return (
    <div className="p-6 space-y-5 max-w-screen-xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Calendar</h1>
          <p className="text-sm text-slate-500 dark:text-primary-400">{events.length} upcoming events</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-slate-200 dark:border-primary-600 rounded-lg overflow-hidden">
            {['month', 'week'].map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 text-sm capitalize transition-colors ${view === v ? 'bg-accent text-white' : 'bg-white dark:bg-primary-700 text-slate-500 dark:text-primary-400 hover:bg-slate-50'}`}>
                {v}
              </button>
            ))}
          </div>
          <Button icon={Plus} onClick={() => setAddOpen(true)}>Add Event</Button>
        </div>
      </div>

      <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-primary-700">
          <button onClick={prev} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-primary-700 text-slate-500 dark:text-primary-300 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <h2 className="font-semibold text-slate-800 dark:text-white">{MONTHS[month]} {year}</h2>
          <button onClick={next} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-primary-700 text-slate-500 dark:text-primary-300 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs font-medium text-slate-400 dark:text-primary-400 py-2.5">{d}</div>
          ))}
          {cells.map((cell, i) => {
            const dayEvents = cell.current ? getEventsForDay(cell.day) : []
            return (
              <div
                key={i}
                className={`min-h-[100px] border-t border-r border-slate-100 dark:border-primary-700 p-1.5 ${!cell.current ? 'bg-slate-50 dark:bg-primary-900/40' : ''} ${i % 7 === 6 ? 'border-r-0' : ''}`}
              >
                <span className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full mb-1 ${isToday(cell.day) && cell.current ? 'bg-accent text-white' : cell.current ? 'text-slate-700 dark:text-white' : 'text-slate-300 dark:text-primary-600'}`}>
                  {cell.day}
                </span>
                <div className="space-y-0.5">
                  {dayEvents.slice(0, 3).map(ev => (
                    <button
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className={`w-full text-left flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium truncate ${typeStyle[ev.type]}`}
                    >
                      {typeIcon[ev.type]}
                      <span className="truncate">{ev.title}</span>
                    </button>
                  ))}
                  {dayEvents.length > 3 && (
                    <p className="text-[10px] text-slate-400 px-1">+{dayEvents.length - 3} more</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl p-5">
        <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {events.sort((a, b) => new Date(a.start) - new Date(b.start)).slice(0, 6).map(ev => (
            <div key={ev.id} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-primary-700 rounded-xl">
              <div className={`p-2 rounded-lg ${typeStyle[ev.type]}`}>
                {typeIcon[ev.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-white">{ev.title}</p>
                <p className="text-xs text-slate-400">{new Date(ev.start).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} · {ev.location}</p>
              </div>
              <button onClick={() => deleteEvent(ev.id)} className="text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">Remove</button>
            </div>
          ))}
        </div>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Create Event">
        <div className="space-y-4">
          <Input label="Event Title" placeholder="Team meeting" value={form.title} onChange={set('title')} />
          <Select label="Type" value={form.type} onChange={set('type')}>
            {EVENT_TYPES.map(t => <option key={t} className="capitalize">{t}</option>)}
          </Select>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start" type="datetime-local" value={form.start} onChange={set('start')} />
            <Input label="End" type="datetime-local" value={form.end} onChange={set('end')} />
          </div>
          <Input label="Location / Link" placeholder="Zoom, Google Meet, Office..." value={form.location} onChange={set('location')} />
          <Textarea label="Notes" placeholder="Agenda, notes..." value={form.notes} onChange={set('notes')} rows={3} />
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.recurring} onChange={set('recurring')} className="w-4 h-4 rounded border-slate-300 text-accent" />
            <span className="text-sm text-slate-600 dark:text-primary-300">Recurring event</span>
          </label>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd}>Create Event</Button>
        </div>
      </Modal>

      <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)} title={selectedEvent?.title || ''} size="sm">
        {selectedEvent && (
          <div className="space-y-3">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeStyle[selectedEvent.type]}`}>
              {typeIcon[selectedEvent.type]} {selectedEvent.type}
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-600 dark:text-primary-300">
                <span className="font-medium text-slate-700 dark:text-white">Start:</span>{' '}
                {new Date(selectedEvent.start).toLocaleString()}
              </p>
              <p className="text-slate-600 dark:text-primary-300">
                <span className="font-medium text-slate-700 dark:text-white">Location:</span>{' '}
                {selectedEvent.location}
              </p>
              {selectedEvent.notes && (
                <p className="text-slate-600 dark:text-primary-300">
                  <span className="font-medium text-slate-700 dark:text-white">Notes:</span>{' '}
                  {selectedEvent.notes}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="danger" size="sm" onClick={() => { deleteEvent(selectedEvent.id); setSelectedEvent(null) }}>Delete</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Phone, Send, Search, Plus, Paperclip } from 'lucide-react'
import { useApp } from '../context/AppContext'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Input, { Select, Textarea } from '../components/ui/Input'
import { clsx } from 'clsx'

const channelIcon = {
  email: <Mail size={14} />,
  whatsapp: <MessageSquare size={14} />,
  sms: <Phone size={14} />,
}

const channelStyle = {
  email: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  whatsapp: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  sms: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
}

export default function Communications() {
  const { messages, setMessages } = useApp()
  const [selected, setSelected] = useState(messages[0] || null)
  const [search, setSearch] = useState('')
  const [filterChannel, setFilterChannel] = useState('')
  const [composeOpen, setComposeOpen] = useState(false)
  const [reply, setReply] = useState('')
  const [composeForm, setComposeForm] = useState({ to: '', channel: 'email', subject: '', body: '' })

  const filtered = messages.filter(m => {
    if (search && !m.from.toLowerCase().includes(search.toLowerCase()) && !m.subject.toLowerCase().includes(search.toLowerCase())) return false
    if (filterChannel && m.channel !== filterChannel) return false
    return true
  })

  const markRead = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  }

  const selectMessage = (msg) => {
    setSelected(msg)
    markRead(msg.id)
  }

  const handleReply = () => {
    if (!reply.trim()) return
    setReply('')
  }

  const set = (key) => (e) => setComposeForm(f => ({ ...f, [key]: e.target.value }))

  return (
    <div className="p-6 space-y-5 max-w-screen-xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Communications</h1>
          <p className="text-sm text-slate-500 dark:text-primary-400">{messages.filter(m => !m.read).length} unread messages</p>
        </div>
        <Button icon={Plus} onClick={() => setComposeOpen(true)}>Compose</Button>
      </div>

      <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl overflow-hidden flex" style={{ minHeight: 600 }}>
        <div className="w-80 border-r border-slate-100 dark:border-primary-700 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-100 dark:border-primary-700 space-y-2">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/30" />
            </div>
            <div className="flex gap-1">
              {['', 'email', 'whatsapp', 'sms'].map(ch => (
                <button key={ch} onClick={() => setFilterChannel(ch)}
                  className={clsx('px-2.5 py-1 text-xs rounded-lg transition-colors capitalize', filterChannel === ch ? 'bg-accent text-white' : 'text-slate-500 dark:text-primary-400 hover:bg-slate-100 dark:hover:bg-primary-700')}>
                  {ch || 'All'}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.map(msg => (
              <button key={msg.id} onClick={() => selectMessage(msg)}
                className={clsx('w-full text-left px-4 py-3.5 border-b border-slate-50 dark:border-primary-700 transition-colors', selected?.id === msg.id ? 'bg-accent/5 border-l-2 border-l-accent' : 'hover:bg-slate-50 dark:hover:bg-primary-700/50')}>
                <div className="flex items-start gap-2.5">
                  <Avatar name={msg.from} size="xs" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-medium truncate ${!msg.read ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-primary-300'}`}>{msg.from}</span>
                      <div className={`p-1 rounded-md ${channelStyle[msg.channel]} shrink-0`}>{channelIcon[msg.channel]}</div>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${!msg.read ? 'font-medium text-slate-700 dark:text-primary-200' : 'text-slate-400'}`}>{msg.subject}</p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{msg.preview}</p>
                  </div>
                  {!msg.read && <div className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1" />}
                </div>
              </button>
            ))}
            {filtered.length === 0 && <p className="text-sm text-slate-400 text-center py-10">No messages found</p>}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {selected ? (
            <>
              <div className="px-6 py-4 border-b border-slate-100 dark:border-primary-700">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-slate-800 dark:text-white">{selected.subject}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-2">
                        <Avatar name={selected.from} size="xs" />
                        <span className="text-sm text-slate-500 dark:text-primary-400">{selected.from} · {selected.email}</span>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${channelStyle[selected.channel]}`}>
                        {channelIcon[selected.channel]}
                        <span className="capitalize">{selected.channel}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{new Date(selected.time).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <div className="bg-slate-50 dark:bg-primary-700 rounded-xl p-4">
                  <p className="text-sm text-slate-700 dark:text-primary-200">{selected.preview}</p>
                  <p className="text-sm text-slate-600 dark:text-primary-300 mt-3">
                    Thank you for reaching out. We appreciate your interest in our solutions. I'd love to schedule a call to discuss how we can best support your needs. Would you be available for a 30-minute demo this week?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-primary-300 mt-3">
                    Best regards,<br />The Scrapbox Team
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 dark:border-primary-700">
                <div className="bg-slate-50 dark:bg-primary-700 rounded-xl p-3">
                  <textarea
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    placeholder={`Reply to ${selected.from}...`}
                    rows={3}
                    className="w-full bg-transparent text-sm text-slate-700 dark:text-white placeholder-slate-400 focus:outline-none resize-none"
                  />
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 dark:border-primary-600">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"><Paperclip size={15} /></button>
                    <Button size="sm" icon={Send} onClick={handleReply}>Send Reply</Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Mail size={40} className="text-slate-200 dark:text-primary-600 mx-auto mb-3" />
                <p className="text-sm text-slate-400">Select a message to read</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal open={composeOpen} onClose={() => setComposeOpen(false)} title="New Message">
        <div className="space-y-4">
          <Input label="To" placeholder="email@company.com" value={composeForm.to} onChange={set('to')} />
          <Select label="Channel" value={composeForm.channel} onChange={set('channel')}>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="sms">SMS</option>
          </Select>
          <Input label="Subject" placeholder="Message subject" value={composeForm.subject} onChange={set('subject')} />
          <Textarea label="Message" placeholder="Write your message..." value={composeForm.body} onChange={set('body')} rows={6} />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setComposeOpen(false)}>Cancel</Button>
          <Button icon={Send} onClick={() => setComposeOpen(false)}>Send Message</Button>
        </div>
      </Modal>
    </div>
  )
}

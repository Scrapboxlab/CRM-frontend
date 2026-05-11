import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Bell, Palette, Link2, User, Save, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input, { Select, Textarea } from '../components/ui/Input'
import Avatar from '../components/ui/Avatar'
import { clsx } from 'clsx'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
]

const integrations = [
  { name: 'Google Workspace', description: 'Sync calendar, contacts, and Drive', connected: true, logo: '🔵' },
  { name: 'Slack', description: 'Get deal notifications in Slack', connected: false, logo: '💬' },
  { name: 'HubSpot', description: 'Import existing CRM data', connected: false, logo: '🧡' },
  { name: 'Zapier', description: 'Automate workflows with 5000+ apps', connected: false, logo: '⚡' },
  { name: 'Stripe', description: 'Sync payment and invoice data', connected: true, logo: '💳' },
  { name: 'Twilio', description: 'Enable SMS and WhatsApp messaging', connected: false, logo: '📱' },
]

export default function Settings() {
  const { user } = useAuth()
  const { addToast } = useApp()
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', title: user?.title || '', phone: '' })
  const [company, setCompany] = useState({ name: 'Scrapbox', industry: 'Technology', website: 'scrapbox.io', address: '', size: '11-50' })
  const [notifs, setNotifs] = useState({ newLead: true, dealWon: true, taskDue: true, mentions: true, overdue: true, weeklyReport: false })

  const setP = (key) => (e) => setProfile(f => ({ ...f, [key]: e.target.value }))
  const setC = (key) => (e) => setCompany(f => ({ ...f, [key]: e.target.value }))
  const toggleNotif = (key) => setNotifs(f => ({ ...f, [key]: !f[key] }))

  const save = () => addToast('Settings saved successfully')

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-primary-400">Manage your account and workspace preferences</p>
      </div>

      <div className="flex gap-6">
        <div className="w-52 shrink-0">
          <nav className="space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={clsx('w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left',
                  activeTab === id ? 'bg-accent text-white' : 'text-slate-600 dark:text-primary-300 hover:bg-slate-100 dark:hover:bg-primary-700')}>
                <Icon size={15} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 space-y-5">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <Card className="p-5">
                <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Personal Information</h2>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar name={user?.name} size="xl" />
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Full Name" value={profile.name} onChange={setP('name')} />
                  <Input label="Email" type="email" value={profile.email} onChange={setP('email')} />
                  <Input label="Job Title" value={profile.title} onChange={setP('title')} />
                  <Input label="Phone" value={profile.phone} onChange={setP('phone')} />
                </div>
              </Card>
              <div className="flex justify-end">
                <Button icon={Save} onClick={save}>Save Changes</Button>
              </div>
            </motion.div>
          )}

          {activeTab === 'company' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <Card className="p-5">
                <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Company Profile</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Company Name" value={company.name} onChange={setC('name')} />
                  <Input label="Website" value={company.website} onChange={setC('website')} />
                  <Select label="Industry" value={company.industry} onChange={setC('industry')}>
                    {['Technology', 'Finance', 'Healthcare', 'Retail', 'Other'].map(i => <option key={i}>{i}</option>)}
                  </Select>
                  <Select label="Company Size" value={company.size} onChange={setC('size')}>
                    {['1-10', '11-50', '51-200', '201-500', '500+'].map(s => <option key={s}>{s}</option>)}
                  </Select>
                  <div className="col-span-2">
                    <Input label="Address" placeholder="123 Main St, City, Country" value={company.address} onChange={setC('address')} />
                  </div>
                </div>
              </Card>
              <div className="flex justify-end">
                <Button icon={Save} onClick={save}>Save Changes</Button>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <Card className="p-5">
                <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Notification Preferences</h2>
                <div className="space-y-3">
                  {[
                    { key: 'newLead', label: 'New lead assigned', desc: 'When a lead is assigned to you' },
                    { key: 'dealWon', label: 'Deal won', desc: 'When a deal is marked as Closed Won' },
                    { key: 'taskDue', label: 'Task due soon', desc: '24 hours before a task is due' },
                    { key: 'mentions', label: 'Mentions', desc: 'When someone mentions you in a note' },
                    { key: 'overdue', label: 'Overdue alerts', desc: 'When tasks or follow-ups become overdue' },
                    { key: 'weeklyReport', label: 'Weekly report', desc: 'Summary of your performance each Monday' },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between py-2.5 border-b border-slate-50 dark:border-primary-700 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-white">{label}</p>
                        <p className="text-xs text-slate-400">{desc}</p>
                      </div>
                      <button onClick={() => toggleNotif(key)}
                        className={clsx('relative w-10 h-5.5 rounded-full transition-colors shrink-0', notifs[key] ? 'bg-accent' : 'bg-slate-200 dark:bg-primary-600')}
                        style={{ height: 22 }}>
                        <span className={clsx('absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform', notifs[key] ? 'translate-x-4.5' : 'translate-x-0')}
                          style={{ width: 18, height: 18, transform: notifs[key] ? 'translateX(18px)' : 'translateX(0)' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
              <div className="flex justify-end">
                <Button icon={Save} onClick={save}>Save Preferences</Button>
              </div>
            </motion.div>
          )}

          {activeTab === 'integrations' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <Card className="p-5">
                <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Connected Integrations</h2>
                <div className="space-y-3">
                  {integrations.map(int => (
                    <div key={int.name} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-primary-700 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{int.logo}</span>
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-white">{int.name}</p>
                          <p className="text-xs text-slate-400">{int.description}</p>
                        </div>
                      </div>
                      <button onClick={() => addToast(int.connected ? `${int.name} disconnected` : `${int.name} connected`)}
                        className={clsx('px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5',
                          int.connected
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-red-100 hover:text-red-600'
                            : 'bg-slate-200 dark:bg-primary-600 text-slate-600 dark:text-primary-300 hover:bg-accent/10 hover:text-accent')}>
                        {int.connected && <Check size={12} />}
                        {int.connected ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FolderOpen, FileText, Search, Download, Trash2, Filter } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { teamMembers, clients as clientsData } from '../data/mock'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'
import Input, { Select } from '../components/ui/Input'
import EmptyState from '../components/ui/EmptyState'
import Avatar from '../components/ui/Avatar'
import { clsx } from 'clsx'

const CATEGORIES = ['contracts', 'proposals', 'invoices', 'misc']

const categoryStyle = {
  contracts: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  proposals: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  invoices: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  misc: 'bg-slate-100 text-slate-600 dark:bg-primary-700 dark:text-primary-300',
}

const categoryIcon = <FileText size={20} />

export default function Documents() {
  const { documents, uploadDocument } = useApp()
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [form, setForm] = useState({ name: '', category: 'misc', size: '1.2 MB', uploadedBy: 'u1', client: '' })

  const userMap = Object.fromEntries(teamMembers.map(u => [u.id, u]))
  const clientMap = Object.fromEntries(clientsData.map(c => [c.id, c]))

  const filtered = documents.filter(d => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filterCat && d.category !== filterCat) return false
    return true
  })

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleUpload = () => {
    uploadDocument(form)
    setUploadOpen(false)
    setForm({ name: '', category: 'misc', size: '1.2 MB', uploadedBy: 'u1', client: '' })
  }

  const catCounts = CATEGORIES.map(cat => ({ cat, count: documents.filter(d => d.category === cat).length }))

  return (
    <div className="p-6 space-y-5 max-w-screen-xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Documents</h1>
          <p className="text-sm text-slate-500 dark:text-primary-400">{documents.length} files</p>
        </div>
        <Button icon={Upload} onClick={() => setUploadOpen(true)}>Upload File</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {catCounts.map(({ cat, count }) => (
          <button key={cat} onClick={() => setFilterCat(filterCat === cat ? '' : cat)}
            className={clsx('text-left p-4 rounded-xl border transition-all', filterCat === cat ? 'border-accent bg-accent/5' : 'bg-white dark:bg-primary-800 border-slate-200 dark:border-primary-700 hover:border-accent/30')}>
            <p className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block mb-2 ${categoryStyle[cat]} capitalize`}>{cat}</p>
            <p className="text-xl font-bold text-slate-800 dark:text-white">{count}</p>
            <p className="text-xs text-slate-400">files</p>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 dark:border-primary-600 rounded-lg bg-white dark:bg-primary-700 text-slate-700 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30" />
        </div>
      </div>

      <div className="bg-white dark:bg-primary-800 border border-slate-200 dark:border-primary-700 rounded-xl overflow-hidden">
        {filtered.length === 0 && <EmptyState icon={FolderOpen} title="No documents found" description="Upload your first document to get started." />}
        <div className="divide-y divide-slate-50 dark:divide-primary-700">
          {filtered.map(doc => (
            <motion.div key={doc.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-primary-700/50 transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-primary-700 flex items-center justify-center text-slate-400 shrink-0">
                <FileText size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{doc.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-slate-400">{doc.size}</span>
                  {doc.client && clientMap[doc.client] && (
                    <span className="text-xs text-slate-400">{clientMap[doc.client].company}</span>
                  )}
                  <span className="text-xs text-slate-400">{doc.uploadedAt}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryStyle[doc.category]} capitalize`}>{doc.category}</span>
              {userMap[doc.uploadedBy] && <Avatar name={userMap[doc.uploadedBy].name} size="xs" />}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors"><Download size={13} /></button>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 size={13} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload Document">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-200 dark:border-primary-600 rounded-xl p-10 text-center cursor-pointer hover:border-accent transition-colors">
            <Upload size={24} className="mx-auto text-slate-300 dark:text-primary-500 mb-2" />
            <p className="text-sm text-slate-500 dark:text-primary-400">Drag & drop files here, or click to browse</p>
            <p className="text-xs text-slate-400 mt-1">PDF, DOCX, XLSX up to 50MB</p>
          </div>
          <Input label="File Name" placeholder="contract-2026.pdf" value={form.name} onChange={set('name')} />
          <Select label="Category" value={form.category} onChange={set('category')}>
            {CATEGORIES.map(c => <option key={c} className="capitalize">{c}</option>)}
          </Select>
          <Select label="Related Client" value={form.client} onChange={set('client')}>
            <option value="">None</option>
            {clientsData.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
          </Select>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setUploadOpen(false)}>Cancel</Button>
          <Button icon={Upload} onClick={handleUpload}>Upload</Button>
        </div>
      </Modal>
    </div>
  )
}

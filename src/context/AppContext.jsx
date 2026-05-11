import { createContext, useContext, useState, useCallback } from 'react'
import { leads as initialLeads, clients as initialClients, deals as initialDeals, tasks as initialTasks, events as initialEvents, messages as initialMessages, notifications as initialNotifications, documents as initialDocuments } from '../data/mock'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [leads, setLeads] = useState(initialLeads)
  const [clients, setClients] = useState(initialClients)
  const [deals, setDeals] = useState(initialDeals)
  const [tasks, setTasks] = useState(initialTasks)
  const [events, setEvents] = useState(initialEvents)
  const [messages, setMessages] = useState(initialMessages)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [documents, setDocuments] = useState(initialDocuments)
  const [toasts, setToasts] = useState([])

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t === 'light' ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', next === 'dark')
      return next
    })
  }, [])

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const markNotificationRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const addLead = useCallback((lead) => {
    const id = `l${Date.now()}`
    setLeads(prev => [{ ...lead, id, createdAt: new Date().toISOString().split('T')[0] }, ...prev])
    addToast('Lead added successfully')
  }, [addToast])

  const updateLead = useCallback((id, data) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...data } : l))
    addToast('Lead updated')
  }, [addToast])

  const deleteLead = useCallback((id) => {
    setLeads(prev => prev.filter(l => l.id !== id))
    addToast('Lead deleted', 'error')
  }, [addToast])

  const addClient = useCallback((client) => {
    const id = `c${Date.now()}`
    setClients(prev => [{ ...client, id, since: new Date().toISOString().split('T')[0] }, ...prev])
    addToast('Client added successfully')
  }, [addToast])

  const updateClient = useCallback((id, data) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...data } : c))
    addToast('Client updated')
  }, [addToast])

  const addDeal = useCallback((deal) => {
    const id = `d${Date.now()}`
    setDeals(prev => [{ ...deal, id }, ...prev])
    addToast('Deal added successfully')
  }, [addToast])

  const updateDeal = useCallback((id, data) => {
    setDeals(prev => prev.map(d => d.id === id ? { ...d, ...data } : d))
    addToast('Deal updated')
  }, [addToast])

  const addTask = useCallback((task) => {
    const id = `t${Date.now()}`
    setTasks(prev => [{ ...task, id }, ...prev])
    addToast('Task created')
  }, [addToast])

  const updateTask = useCallback((id, data) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...data } : t))
    addToast('Task updated')
  }, [addToast])

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
    addToast('Task deleted', 'error')
  }, [addToast])

  const addEvent = useCallback((event) => {
    const id = `e${Date.now()}`
    setEvents(prev => [...prev, { ...event, id }])
    addToast('Event created')
  }, [addToast])

  const deleteEvent = useCallback((id) => {
    setEvents(prev => prev.filter(e => e.id !== id))
    addToast('Event deleted', 'error')
  }, [addToast])

  const uploadDocument = useCallback((doc) => {
    const id = `doc${Date.now()}`
    setDocuments(prev => [{ ...doc, id, uploadedAt: new Date().toISOString().split('T')[0] }, ...prev])
    addToast('Document uploaded')
  }, [addToast])

  const unreadNotifications = notifications.filter(n => !n.read).length
  const unreadMessages = messages.filter(m => !m.read).length

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      sidebarOpen, setSidebarOpen,
      leads, setLeads, addLead, updateLead, deleteLead,
      clients, setClients, addClient, updateClient,
      deals, setDeals, addDeal, updateDeal,
      tasks, setTasks, addTask, updateTask, deleteTask,
      events, setEvents, addEvent, deleteEvent,
      messages, setMessages,
      notifications, markNotificationRead, markAllNotificationsRead, unreadNotifications,
      documents, uploadDocument,
      unreadMessages,
      toasts, addToast, removeToast,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

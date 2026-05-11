import { createContext, useContext, useState } from 'react'
import { currentUser } from '../data/mock'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setUser({ ...currentUser, email })
    setLoading(false)
    return true
  }

  const register = async (data) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setUser({ ...currentUser, ...data })
    setLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

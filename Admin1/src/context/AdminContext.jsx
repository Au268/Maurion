import { createContext, useContext, useState, useCallback } from 'react'

// ── Admin Context ─────────────────────────────────────────────────────────
const AdminContext = createContext(null)

export const AdminProvider = ({ children }) => {
  const [search, setSearch]     = useState('')
  const [toast, setToast]       = useState(null)   // { msg, type, id }

  // Show toast notification
  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type, id: Date.now() })
  }, [])

  const clearToast = useCallback(() => setToast(null), [])

  return (
    <AdminContext.Provider value={{
      search,
      setSearch,
      toast,
      showToast,
      clearToast,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────
export const useAdmin = () => {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}

export default AdminContext

import { Outlet } from 'react-router-dom'
import { AdminProvider, useAdmin } from '../../context/AdminContext.jsx'
import Navbar from './Navbar.jsx'
import TopBar from './TopBar.jsx'
import Toast from './Toast.jsx'

// ── Inner layout that can access AdminContext ─────────────────────────────
const LayoutInner = () => {
  const { toast, clearToast } = useAdmin()

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1, marginLeft: 288 }}>
        <TopBar />
        <main style={{ paddingTop: 96, minHeight: '100vh' }}>
          <div style={{ padding: '48px 48px 80px', maxWidth: 1280 }}>
            <Outlet />
          </div>
        </main>
      </div>
      {toast && (
        <Toast
          key={toast.id}
          message={toast.msg}
          type={toast.type}
          onDone={clearToast}
        />
      )}
    </div>
  )
}

// ── Admin Layout wraps everything in context ──────────────────────────────
const AdminLayout = () => (
  <AdminProvider>
    <LayoutInner />
  </AdminProvider>
)

export default AdminLayout

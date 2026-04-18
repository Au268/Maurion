import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/common/AdminLayout.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import CustomersPage from './pages/CustomersPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"  element={<DashboardPage />} />
          <Route path="products"   element={<ProductsPage />} />
          <Route path="orders"     element={<OrdersPage />} />
          <Route path="customers"  element={<CustomersPage />} />
          <Route path="settings"   element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

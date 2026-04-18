# Maurion Noir — Admin Panel

A full React admin panel for managing products and orders, styled to match the Maurion Noir design system.

## Project Structure

```
admin/
├── src/
│   ├── apis/
│   │   ├── config.js           # API base URL
│   │   ├── getProducts.jsx     # Product CRUD API calls
│   │   └── getOrders.jsx       # Order API calls
│   ├── assets/
│   │   └── products/           # Local product images (if needed)
│   ├── components/
│   │   ├── common/
│   │   │   ├── AdminLayout.jsx # Root layout (sidebar + topbar + outlet)
│   │   │   ├── Navbar.jsx      # Sidebar navigation
│   │   │   ├── TopBar.jsx      # Top header with search
│   │   │   ├── Icon.jsx        # Material Symbols wrapper
│   │   │   ├── Avatar.jsx      # Initials avatar
│   │   │   ├── StatCard.jsx    # Metric card
│   │   │   ├── Toast.jsx       # Toast notification
│   │   │   └── ConfirmDialog.jsx # Delete confirm modal
│   │   ├── dashboard/
│   │   │   ├── RecentOrders.jsx # Orders mini-table
│   │   │   └── TopSellers.jsx   # Top products widget
│   │   ├── products/
│   │   │   ├── ProductTable.jsx # Products data table
│   │   │   └── ProductPanel.jsx # Add/Edit slide panel
│   │   └── orders/
│   │       ├── StatusBadge.jsx  # Coloured status pill
│   │       ├── StatusDropdown.jsx # Inline status updater
│   │       └── OrderTable.jsx   # Orders data table
│   ├── context/
│   │   └── AdminContext.jsx    # Global search + toast state
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── CustomersPage.jsx
│   │   └── SettingsPage.jsx
│   ├── App.jsx                 # Router setup
│   ├── App.css
│   ├── index.css               # Global styles + CSS vars
│   └── main.jsx                # Entry point
├── .env                        # VITE_API_BASE_URL
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Set your backend URL in .env
VITE_API_BASE_URL=https://your-backend.vercel.app/api

# 3. Run dev server
npm run dev

# 4. Build for production
npm run build
```

## API Endpoints Expected

| Method | Endpoint              | Purpose              |
|--------|-----------------------|----------------------|
| GET    | /api/products         | List all products    |
| POST   | /api/products         | Add product          |
| PUT    | /api/products/:id     | Update product       |
| DELETE | /api/products/:id     | Delete product       |
| GET    | /api/orders           | List all orders      |
| PUT    | /api/orders/:id       | Update order status  |

## Features

- ✅ Dashboard with live stats
- ✅ Product catalog — Add, Edit, Delete with image preview
- ✅ Orders table with inline status updates
- ✅ Global search via context
- ✅ Toast notifications
- ✅ Confirm dialog for destructive actions
- ✅ Pagination on orders
- ✅ React Router v6 navigation
- ✅ CSS variables — full Maurion Noir design tokens

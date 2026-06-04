import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../lib/AdminAuthContext';

const NAV = [
  { section: 'Overview', items: [
    { to: '/admin', label: 'Dashboard', end: true },
  ]},
  { section: 'Catalog', items: [
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/categories', label: 'Categories' },
    { to: '/admin/coupons', label: 'Coupons' },
    { to: '/admin/reviews', label: 'Reviews' },
    { to: '/admin/media', label: 'Media' },
  ]},
  { section: 'Sales', items: [
    { to: '/admin/orders', label: 'Orders' },
    { to: '/admin/customers', label: 'Customers' },
  ]},
  { section: 'Content', items: [
    { to: '/admin/posts', label: 'Blog Posts' },
    { to: '/admin/concerns', label: 'Concerns' },
    { to: '/admin/member-benefits', label: 'Member Benefits' },
    { to: '/admin/social-cards', label: 'Social Cards' },
    { to: '/admin/scientists', label: 'Scientists' },
  ]},
  { section: 'Engagement', items: [
    { to: '/admin/subscribers', label: 'Subscribers' },
    { to: '/admin/contact-messages', label: 'Contact Messages' },
  ]},
  { section: 'System', items: [
    { to: '/admin/settings', label: 'Settings' },
  ]},
];

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onLogout = () => { logout(); navigate('/admin/login', { replace: true }); };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex">
      {/* Sidebar */}
      <aside className={`${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200 transition-transform overflow-y-auto`}>
        <div className="p-5 border-b border-neutral-200">
          <div className="text-lg font-semibold">Pareshey Organic</div>
          <div className="text-[10px] uppercase tracking-widest text-neutral-500 mt-0.5">Admin</div>
          <div className="text-xs text-neutral-500 mt-0.5 truncate">{admin?.email}</div>
        </div>
        <nav className="p-3 space-y-5">
          {NAV.map((g) => (
            <div key={g.section}>
              <div className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{g.section}</div>
              <ul className="space-y-0.5">
                {g.items.map((it) => (
                  <li key={it.to}>
                    <NavLink to={it.to} end={it.end}
                      className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}>
                      {it.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {open && <div className="lg:hidden fixed inset-0 bg-black/40 z-30" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-neutral-200 px-4 lg:px-8 py-3 flex items-center justify-between">
          <button onClick={() => setOpen(true)} className="lg:hidden text-sm border border-neutral-300 px-3 py-1.5 rounded-lg">Menu</button>
          <div className="flex items-center gap-3 ml-auto">
            <a href="/" target="_blank" rel="noreferrer" className="text-xs text-neutral-500 hover:text-neutral-900">View store →</a>
            <button onClick={onLogout} className="text-sm border border-neutral-300 px-3 py-1.5 rounded-lg hover:bg-neutral-100">Logout</button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 max-w-screen-2xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

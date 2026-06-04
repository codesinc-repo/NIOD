import { Link } from 'react-router-dom';
import { useApi } from '../../lib/hooks';
import { formatMoney, formatDateTime } from '../../lib/format';

function StatCard({ label, value, accent }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5">
      <div className="text-xs uppercase tracking-wider text-neutral-500">{label}</div>
      <div className={`mt-2 text-2xl font-semibold ${accent || ''}`}>{value}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data, loading, error } = useApi('/api/admin/dashboard', { admin: true });

  if (loading) return <div className="text-sm text-neutral-500">Loading…</div>;
  if (error)   return <div className="text-sm text-red-600">Failed to load: {error.message}</div>;

  const c = data?.counts || {};
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-neutral-500">Snapshot of your storefront.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Revenue (PKR)" value={formatMoney(c.revenue, 'PKR')} />
        <StatCard label="Orders" value={Number(c.orders_total || 0)} />
        <StatCard label="Pending" value={Number(c.pending || 0)} accent="text-amber-600" />
        <StatCard label="Delivered" value={Number(c.delivered || 0)} accent="text-emerald-600" />
        <StatCard label="Products" value={Number(c.products || 0)} />
        <StatCard label="Customers" value={Number(c.customers || 0)} />
        <StatCard label="Subscribers" value={Number(c.subscribers || 0)} />
        <StatCard label="Unread Messages" value={Number(c.unread_messages || 0)} accent="text-red-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200 rounded-xl">
          <div className="px-5 py-3 border-b border-neutral-200 flex items-center justify-between">
            <div className="font-medium">Recent Orders</div>
            <Link to="/admin/orders" className="text-xs text-neutral-500 hover:text-neutral-900">View all →</Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {(data?.recent_orders || []).map((o) => (
              <Link key={o.id} to={`/admin/orders/${o.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-neutral-50">
                <div>
                  <div className="text-sm font-medium">{o.order_number}</div>
                  <div className="text-xs text-neutral-500">{o.ship_full_name} · {formatDateTime(o.placed_at)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{formatMoney(o.grand_total)}</div>
                  <div className="text-xs uppercase tracking-wider text-neutral-500">{o.status}</div>
                </div>
              </Link>
            ))}
            {(!data?.recent_orders || data.recent_orders.length === 0) && (
              <div className="px-5 py-6 text-sm text-neutral-500">No orders yet.</div>
            )}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl">
          <div className="px-5 py-3 border-b border-neutral-200 flex items-center justify-between">
            <div className="font-medium">Low Stock</div>
            <Link to="/admin/products" className="text-xs text-neutral-500 hover:text-neutral-900">Manage →</Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {(data?.low_stock || []).map((p) => (
              <Link key={p.id} to={`/admin/products/${p.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-neutral-50">
                <div className="text-sm">{p.name}</div>
                <div className={`text-sm font-medium ${p.stock === 0 ? 'text-red-600' : 'text-amber-600'}`}>{p.stock} left</div>
              </Link>
            ))}
            {(!data?.low_stock || data.low_stock.length === 0) && (
              <div className="px-5 py-6 text-sm text-neutral-500">Everything is well-stocked.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

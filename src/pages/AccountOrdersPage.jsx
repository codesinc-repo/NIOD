import { Link, Navigate } from 'react-router-dom';
import StoreShell from '../components/StoreShell';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/hooks';
import { formatMoney, formatDateTime } from '../lib/format';

const STATUS_LABEL = {
  pending: 'Order placed', confirmed: 'Confirmed', processing: 'Processing',
  shipped: 'Shipped', out_for_delivery: 'Out for delivery',
  delivered: 'Delivered', cancelled: 'Cancelled', refunded: 'Refunded',
};

export default function AccountOrdersPage() {
  const { user, loading } = useAuth();
  const { data } = useApi(user ? '/api/orders' : null, { auth: true });
  if (loading) return <StoreShell><div className="max-w-3xl mx-auto px-4 py-16 text-sm text-neutral-500">Loading…</div></StoreShell>;
  if (!user)   return <Navigate to="/login?next=/account/orders" replace />;
  const rows = data?.data || [];
  return (
    <StoreShell>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link to="/account" className="text-sm text-neutral-500 hover:underline">← Account</Link>
        <h1 className="text-3xl font-light mt-2 mb-6">Orders</h1>
        {rows.length === 0 ? <div className="text-sm text-neutral-600">No orders yet.</div> : (
          <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
            {rows.map((o) => (
              <li key={o.id} className="py-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{o.order_number}</div>
                  <div className="text-xs text-neutral-500">{formatDateTime(o.placed_at)} · {STATUS_LABEL[o.status] || o.status}</div>
                </div>
                <div className="text-sm font-medium">{formatMoney(o.grand_total, o.currency)}</div>
                <Link to={`/order-confirmation/${o.order_number}?email=${encodeURIComponent(user.email)}`} className="text-sm underline">View</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </StoreShell>
  );
}

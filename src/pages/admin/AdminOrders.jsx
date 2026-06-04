import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../lib/hooks';
import { formatMoney, formatDateTime } from '../../lib/format';
import { Btn, Card, PageTitle, EmptyState, StatusPill } from './_shared';

const STATUSES = ['', 'pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'];

export default function AdminOrders() {
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const path = `/api/admin/orders?${new URLSearchParams({ status, q, limit: '100' }).toString()}`;
  const { data, loading } = useApi(path, { admin: true });
  const rows = data?.data || [];
  return (
    <div>
      <PageTitle title="Orders" subtitle={`${data?.total ?? 0} total`} />
      <div className="mb-4 flex gap-2 flex-wrap">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
          <option value="">All statuses</option>
          {STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{s.replaceAll('_', ' ')}</option>)}
        </select>
        <input placeholder="Search order #, email, name…" value={q} onChange={(e) => setQ(e.target.value)}
          className="px-3 py-2 border border-neutral-300 rounded-lg text-sm w-72" />
      </div>
      <Card className="overflow-hidden">
        {loading ? <div className="p-6 text-sm text-neutral-500">Loading…</div>
          : rows.length === 0 ? <EmptyState title="No orders match" />
          : (
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 tracking-wider">
                <tr>
                  <th className="text-left px-4 py-2.5">Order</th>
                  <th className="text-left px-4 py-2.5">Customer</th>
                  <th className="text-left px-4 py-2.5">Placed</th>
                  <th className="text-right px-4 py-2.5">Total</th>
                  <th className="text-center px-4 py-2.5">Status</th>
                  <th className="text-center px-4 py-2.5">Payment</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((o) => (
                  <tr key={o.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                    <td className="px-4 py-3"><Link to={`/admin/orders/${o.id}`} className="font-medium hover:underline">{o.order_number}</Link></td>
                    <td className="px-4 py-3"><div className="text-sm">{o.ship_full_name}</div><div className="text-xs text-neutral-500">{o.email}</div></td>
                    <td className="px-4 py-3 text-neutral-600">{formatDateTime(o.placed_at)}</td>
                    <td className="px-4 py-3 text-right">{formatMoney(o.grand_total, o.currency)}</td>
                    <td className="px-4 py-3 text-center"><StatusPill status={o.status} /></td>
                    <td className="px-4 py-3 text-center"><StatusPill status={o.payment_status} /> <span className="text-xs text-neutral-400 ml-1">{o.payment_method}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </Card>
    </div>
  );
}

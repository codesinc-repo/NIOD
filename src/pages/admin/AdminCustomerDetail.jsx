import { Link, useParams } from 'react-router-dom';
import { useApi } from '../../lib/hooks';
import { formatDate, formatMoney } from '../../lib/format';
import { Btn, Card, PageTitle, StatusPill } from './_shared';

export default function AdminCustomerDetail() {
  const { id } = useParams();
  const { data, loading } = useApi(`/api/admin/customers/${id}`, { admin: true });
  if (loading) return <div className="text-sm text-neutral-500">Loading…</div>;
  if (!data) return <div className="text-sm text-red-600">Not found</div>;
  return (
    <div>
      <PageTitle title={data.name} subtitle={data.email} action={<Btn as="link" to="/admin/customers">← All customers</Btn>} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 text-sm space-y-2">
          <div className="font-medium">Profile</div>
          <div><span className="text-neutral-500">Phone:</span> {data.phone || '—'}</div>
          <div><span className="text-neutral-500">Joined:</span> {formatDate(data.created_at)}</div>
          <div><span className="text-neutral-500">Active:</span> {data.is_active ? 'Yes' : 'No'}</div>
        </Card>
        <Card className="p-5 lg:col-span-2">
          <div className="font-medium mb-3">Orders</div>
          {(!data.orders || data.orders.length === 0) ? <div className="text-sm text-neutral-500">No orders yet.</div> : (
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-neutral-500"><tr><th className="text-left py-2">Order #</th><th className="text-left py-2">Placed</th><th className="text-right py-2">Total</th><th className="text-center py-2">Status</th></tr></thead>
              <tbody>
                {data.orders.map((o) => (
                  <tr key={o.id} className="border-t border-neutral-100">
                    <td className="py-2"><Link to={`/admin/orders/${o.id}`} className="font-medium hover:underline">{o.order_number}</Link></td>
                    <td className="py-2 text-neutral-600">{formatDate(o.placed_at)}</td>
                    <td className="py-2 text-right">{formatMoney(o.grand_total)}</td>
                    <td className="py-2 text-center"><StatusPill status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  );
}

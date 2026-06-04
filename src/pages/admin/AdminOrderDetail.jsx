import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/api';
import { useApi } from '../../lib/hooks';
import { formatMoney, formatDateTime } from '../../lib/format';
import { Btn, Card, PageTitle, StatusPill } from './_shared';

const STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'];
const PAY_STATUSES = ['unpaid', 'paid', 'refunded', 'failed'];

export default function AdminOrderDetail() {
  const { id } = useParams();
  const { data, loading, reload } = useApi(`/api/admin/orders/${id}`, { admin: true });
  const [working, setWorking] = useState(false);
  const [note, setNote] = useState('');

  if (loading) return <div className="text-sm text-neutral-500">Loading…</div>;
  if (!data) return <div className="text-sm text-red-600">Order not found.</div>;
  const o = data;

  async function updateStatus(newStatus) {
    setWorking(true);
    try { await api.patch(`/api/admin/orders/${id}/status`, { status: newStatus, note }, { admin: true }); setNote(''); reload(); }
    finally { setWorking(false); }
  }
  async function updatePayment(ps) {
    setWorking(true);
    try { await api.patch(`/api/admin/orders/${id}/payment`, { payment_status: ps }, { admin: true }); reload(); }
    finally { setWorking(false); }
  }

  return (
    <div>
      <PageTitle title={o.order_number} subtitle={`Placed ${formatDateTime(o.placed_at)}`}
        action={<Btn as="link" to="/admin/orders">← All orders</Btn>} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-2">
          <div className="font-medium mb-3">Items</div>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-neutral-500">
              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-right py-2">Qty</th>
                <th className="text-right py-2">Unit</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {(o.items || []).map((it) => (
                <tr key={it.id} className="border-t border-neutral-100">
                  <td className="py-2.5">
                    <div className="flex items-center gap-3">
                      {it.product_image && <img src={it.product_image} alt="" className="w-10 h-10 rounded object-cover bg-neutral-100" />}
                      <div><div className="font-medium">{it.product_name}</div>{it.size_label && <div className="text-xs text-neutral-500">{it.size_label}</div>}</div>
                    </div>
                  </td>
                  <td className="text-right">{it.qty}</td>
                  <td className="text-right">{formatMoney(it.unit_price, o.currency)}</td>
                  <td className="text-right">{formatMoney(it.line_total, o.currency)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="text-sm">
              <tr><td colSpan="3" className="text-right pt-3 text-neutral-500">Subtotal</td><td className="text-right pt-3">{formatMoney(o.subtotal, o.currency)}</td></tr>
              {Number(o.discount_total) > 0 && <tr><td colSpan="3" className="text-right text-neutral-500">Discount ({o.coupon_code || '—'})</td><td className="text-right">−{formatMoney(o.discount_total, o.currency)}</td></tr>}
              <tr><td colSpan="3" className="text-right text-neutral-500">Shipping</td><td className="text-right">{formatMoney(o.shipping_total, o.currency)}</td></tr>
              {Number(o.tax_total) > 0 && <tr><td colSpan="3" className="text-right text-neutral-500">Tax</td><td className="text-right">{formatMoney(o.tax_total, o.currency)}</td></tr>}
              <tr><td colSpan="3" className="text-right pt-2 font-semibold">Total</td><td className="text-right pt-2 font-semibold">{formatMoney(o.grand_total, o.currency)}</td></tr>
            </tfoot>
          </table>

          <div className="mt-6 pt-4 border-t border-neutral-200">
            <div className="font-medium mb-2">Status history</div>
            <ul className="space-y-2 text-sm">
              {(o.history || []).map((h) => (
                <li key={h.id} className="flex items-start gap-3">
                  <StatusPill status={h.status} />
                  <div className="flex-1"><div className="text-neutral-600">{h.note || '—'}</div><div className="text-xs text-neutral-400">{formatDateTime(h.created_at)}</div></div>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <div className="font-medium mb-3">Status</div>
            <div className="mb-3"><StatusPill status={o.status} /></div>
            <textarea placeholder="Optional note" value={note} onChange={(e) => setNote(e.target.value)} className="w-full text-sm border border-neutral-300 rounded-lg px-3 py-2 mb-2 min-h-[60px]" />
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <button key={s} disabled={working || s === o.status} onClick={() => updateStatus(s)}
                  className={`text-xs px-2.5 py-1 rounded-lg border ${s === o.status ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300 hover:bg-neutral-100'}`}>{s.replaceAll('_', ' ')}</button>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <div className="font-medium mb-3">Payment</div>
            <div className="mb-3 flex items-center gap-2"><StatusPill status={o.payment_status} /><span className="text-xs text-neutral-500">{o.payment_method}</span></div>
            <div className="flex flex-wrap gap-1.5">
              {PAY_STATUSES.map((s) => (
                <button key={s} disabled={working || s === o.payment_status} onClick={() => updatePayment(s)}
                  className={`text-xs px-2.5 py-1 rounded-lg border ${s === o.payment_status ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300 hover:bg-neutral-100'}`}>{s}</button>
              ))}
            </div>
          </Card>
          <Card className="p-5 text-sm">
            <div className="font-medium mb-2">Shipping address</div>
            <div>{o.ship_full_name}</div>
            {o.ship_phone && <div className="text-neutral-500">{o.ship_phone}</div>}
            <div className="mt-1">{o.ship_line1}{o.ship_line2 ? `, ${o.ship_line2}` : ''}</div>
            <div>{o.ship_city}{o.ship_state ? `, ${o.ship_state}` : ''} {o.ship_postal_code || ''}</div>
            <div>{o.ship_country}</div>
            <div className="mt-3 pt-3 border-t border-neutral-200">
              <div className="text-neutral-500">Email</div><div>{o.email}</div>
              {o.phone && <><div className="mt-2 text-neutral-500">Phone</div><div>{o.phone}</div></>}
            </div>
            {o.notes && <div className="mt-3 pt-3 border-t border-neutral-200"><div className="text-neutral-500">Notes</div><div>{o.notes}</div></div>}
          </Card>
        </div>
      </div>
    </div>
  );
}
